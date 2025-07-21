import axios, { AxiosResponse } from "axios";
import { config } from "../../config/constants";
import { pushBadRequestMessage } from "../utilities/message";
import { logout } from "../utilities/logoutUser";
import Toast from "react-native-toast-message";
import { getUser, saveUser } from "../utilities/secureStore";
import authApiInstance from "../../services/auth/auth";

const request = axios.create({
  baseURL: config.apiUrl,
  timeout: 1 * 60 * 1000, // 1 minute
  headers: {
    Accept: "application/json",
  },
  // withCredentials: true,
});
request.interceptors.request.use(
  async (config) => {
    try {
      const storedData = await getUser();

      if (!storedData) throw new Error("No user data in SecureStore");
      const { access_token } = storedData;

      if (access_token && config.headers) {
        config.headers.Authorization = `Bearer ${access_token}`;
      }
      return config;
    } catch (error) {
      console.warn("Interceptor auth error:", error);
      return config; // allow request to go through even if token fails
    }
  },
  (error) => Promise.reject(error)
);
request.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const { response } = error;
    const prevRequestConfig = error.config;

    switch (response?.data?.statusCode) {
      case 401: {
        const user = await getUser();
        const refresh_token = user?.refresh_token;
        if (!refresh_token) {
          await logout();
        } else if (!prevRequestConfig.headers["X-RefreshToken"]) {
          try {
            const refreshed = await authApiInstance.refreshToken(refresh_token);
            const {
              access_token: new_access_token,
              refresh_token: new_refresh_token,
            } = refreshed?.data;
            const updatedUser = {
              ...user,
              access_token: new_access_token,
              refresh_token: new_refresh_token ?? refresh_token,
            };
            await saveUser(updatedUser);
            prevRequestConfig.headers[
              "Authorization"
            ] = `Bearer ${new_access_token}`;

            return request({
              ...prevRequestConfig,
              headers: prevRequestConfig.headers.toJSON(),
            });
          } catch (refreshError) {
            console.error("Token refresh failed", refreshError);
            await logout();
          }
        } else {
          await logout();
        }

        break;
      }
      case 400:
      case 404:
        pushBadRequestMessage(response.data);
        break;
      default:
        Toast.show({
          type: "error",
          text1: "Something went wrong",
          visibilityTime: 5000,
        });
        break;
    }
    return Promise.reject(error);
  }
);

export default request;

import { config } from "../../config/constants";
import request from "../../library/axios/request";
import { IRequestOtp } from "./auth.model";

class AuthApi {
  ENDPOINT = "/auth";

  async requestOtp(data: IRequestOtp): Promise<any> {
    const url = `${this.ENDPOINT}/request-otp`;
    return request({ url, method: "POST", data }).then((res: any) => {
      return res?.data;
    });
  }
}

const authApiInstance = new AuthApi();
export default authApiInstance;

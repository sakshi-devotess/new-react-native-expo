import request from "../../library/axios/request";
import { IUser } from "./user.model";

class UserServiceApi {
  ENDPOINT = "/user";

  public async getUser(id: number): Promise<any> {
    const url = `${this.ENDPOINT}/${id}`;
    return request({ url, method: "GET" }).then((res: any) => {
      return res?.data;
    });
  }

  public async updateMyProfile(formData: FormData): Promise<any> {
    console.log("formData :>> ", formData);
    const url = `${this.ENDPOINT}/my-profile`;
    return request({
      url,
      method: "PATCH",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      transformRequest: (data, headers) => {
        return formData;
      },
    }).then((res: any) => {
      return res?.data;
    });
  }
}

const userApiInstance = new UserServiceApi();
export default userApiInstance;

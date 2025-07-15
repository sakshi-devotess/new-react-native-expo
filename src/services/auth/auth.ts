import request from "../../library/axios/request";
import { IRequestOtp, ISetMpin, IVerifyOtp } from "./auth.model";

class AuthApi {
  ENDPOINT = "/auth";

  async requestOtp(data: IRequestOtp): Promise<any> {
    const url = `${this.ENDPOINT}/request-otp`;
    return request({ url, method: "POST", data }).then((res: any) => {
      return res?.data;
    });
  }

  async verifyOtp(data: IVerifyOtp): Promise<any> {
    const url = `${this.ENDPOINT}/verify-otp`;
    return request({ url, method: "POST", data }).then((res: any) => {
      return res?.data;
    });
  }

  async setMpin(data: ISetMpin): Promise<any> {
    const url = `${this.ENDPOINT}/set-mpin`;
    return request({ url, method: "POST", data }).then((res: any) => {
      return res?.data;
    });
  }
}

const authApiInstance = new AuthApi();
export default authApiInstance;

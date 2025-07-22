import request from "../../library/axios/request";
import {
  IChangeMpin,
  IRequestOtp,
  ISetMpin,
  IVerifyMpin,
  IVerifyOtp,
} from "./auth.model";

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

  async verifyMpin(data: IVerifyMpin): Promise<any> {
    const url = `${this.ENDPOINT}/verify-mpin`;
    return request({ url, method: "POST", data }).then((res: any) => {
      return res?.data;
    });
  }

  async resendOtp(data: IRequestOtp): Promise<any> {
    const url = `${this.ENDPOINT}/resend-otp`;
    return request({ url, method: "POST", data }).then((res: any) => {
      return res?.data;
    });
  }

  public async refreshToken(refreshToken: string): Promise<any> {
    const url = `${this.ENDPOINT}/refresh`;
    return request({
      url,
      method: "POST",
      data: { refresh_token: refreshToken },
      headers: { "X-RefreshToken": true },
    }).then((res) => {
      return res.data;
    });
  }

  public async changeMyMpin(data: IChangeMpin): Promise<any> {
    const url = `${this.ENDPOINT}/change-my-mpin`;
    return request({ url, method: "POST", data }).then((res: any) => {
      return res.data;
    });
  }
}

const authApiInstance = new AuthApi();
export default authApiInstance;

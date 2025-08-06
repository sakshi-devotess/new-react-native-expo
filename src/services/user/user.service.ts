import request from "../../library/axios/request";

class UserServiceApi {
  ENDPOINT = "/user";

  public async getUser(id: number): Promise<any> {
    const url = `${this.ENDPOINT}/${id}`;
    return request({ url, method: "GET" }).then((res: any) => {
      return res?.data;
    });
  }

  public async updateMyProfile(formData: FormData): Promise<any> {
    const url = `${this.ENDPOINT}/my-profile`;
    return request({
      url,
      method: "PATCH",
      data: formData,
      transformRequest: () => formData,
      headers: {
        "content-type": "multipart/form-data",
      },
    }).then((res: any) => {
      return res?.data;
    });
  }

  public async createUser(data: any): Promise<any> {
    const url = `${this.ENDPOINT}`;
    return request({
      url,
      method: "POST",
      data: data,
    }).then((res: any) => {
      return res?.data;
    });
  }

  public async updateUser(data: any): Promise<any> {
    const url = `${this.ENDPOINT}/update-user/${data.id}`;
    return request({
      url,
      method: "PATCH",
      data: data,
    }).then((res: any) => {
      return res?.data;
    });
  }

  public async getUsers(): Promise<any> {
    const url = `${this.ENDPOINT}`;
    return request({ url, method: "GET" }).then((res: any) => {
      return res?.data;
    });
  }
}

const userApiInstance = new UserServiceApi();
export default userApiInstance;

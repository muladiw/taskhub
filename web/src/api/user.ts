import GeneralApi from "@/api/GeneralApi";
const url = "/user";

class ApiUser extends GeneralApi {
  constructor() {
    super(url);
  }

  async postData(data: { email: string; password: string }) {
    return this.generateApi({
      headers: { "Content-Type": "application/json" },
      newUrl: this.url,
      method: "POST",
      data: JSON.stringify(data),
      errorMsg: "Error Submit Data",
    });
  }
}

const apiUser = new ApiUser();

export default apiUser;

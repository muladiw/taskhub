import GeneralApi from "@/api/GeneralApi";
const url = "/auth";

class ApiAuth extends GeneralApi {
  constructor() {
    super(url);
  }

  async login(data: LOGIN) {
    return this.generateApi({
      newUrl: this.url,
      method: "POST",
      data: JSON.stringify(data),
      errorMsg: "Error Login",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

const apiAuth = new ApiAuth();

export default apiAuth;

export interface LOGIN {
  email: string;
  password: string;
}

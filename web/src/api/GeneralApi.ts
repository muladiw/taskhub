/* eslint-disable @typescript-eslint/no-explicit-any */
import * as helper from "@/libs/helper";
import Cookies from "universal-cookie";

export default class GeneralApi {
  url: string;
  helper: { showError: (errorMessage: string, title: string) => void };
  cookies: Cookies;
  constructor(url: string) {
    this.url = url;
    this.helper = helper;
    this.cookies = new Cookies();
  }

  thenFunction(res: any) {
    return {
      isSuccess: true,
      ...res,
    };
  }

  catchFunction(errMessage: string, title = "") {
    this.helper.showError(errMessage, title);

    return { isSuccess: false };
  }

  async generateApi({
    headers = {},
    newUrl,
    method = "GET",
    data,
    errorMsg = "Error Get Data",
  }: {
    headers?: HeadersInit;
    newUrl: string;
    method?: string;
    data?: any;
    errorMsg?: string;
  }) {
    let result;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${newUrl}`,
        {
          method,
          body: data,
          headers,
        }
      );

      const res = await response.json();
      if (response.status > 201) {
        result = this.catchFunction(res.errors, errorMsg);
      } else result = this.thenFunction(res);
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      result = this.catchFunction(message, errorMsg);
    }
    return result;
  }

  async refreshToken() {
    const result = await this.generateApi({
      newUrl: "/auth",
      method: "PUT",
      data: JSON.stringify({
        refreshToken: this.cookies.get("refreshToken"),
      }),
      errorMsg: "Error",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!result.isSuccess) {
      this.cookies.remove("refreshToken");

      if (process.env.NEXT_PUBLIC_APP != "kas")
        window.location = "/login" as string & Location;
    }
    return result;
  }

  async postData(data: any, isAuth = true) {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (isAuth) {
      const result = await this.refreshToken();
      headers.Authorization = `Bearer ${result.auth.accessToken}`;
    }
    return this.generateApi({
      headers,
      newUrl: this.url,
      method: "POST",
      data: JSON.stringify(data),
      errorMsg: "Error Submit Data",
    });
  }

  async getData(params: any, isAuth = true) {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (isAuth) {
      const result = await this.refreshToken();
      headers.Authorization = `Bearer ${result.auth.accessToken}`;
    }
    return this.generateApi({
      headers,
      newUrl: `${this.url}?${new URLSearchParams(params)}`,
      errorMsg: "Error Get Data",
    });
  }

  async getOption(params = {}, isAuth = true, headers: HeadersInit = {}) {
    let finalHeaders: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (isAuth) {
      const result = await this.refreshToken();
      finalHeaders.Authorization = `Bearer ${result.auth.accessToken}`;
    }
    finalHeaders = { ...finalHeaders, ...headers };
    return this.generateApi({
      headers: finalHeaders,
      newUrl: `${this.url}/option?${new URLSearchParams(params)}`,
      errorMsg: "Error Get Data",
    });
  }

  async getDataById(id: string, isAuth = true) {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (isAuth) {
      const result = await this.refreshToken();
      headers.Authorization = `Bearer ${result.auth.accessToken}`;
    }
    return this.generateApi({
      headers,
      newUrl: `${this.url}/${id}`,
      errorMsg: "Error Get Data",
    });
  }

  async putDataById(id: string, data: any, isAuth = true) {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (isAuth) {
      const result = await this.refreshToken();
      headers.Authorization = `Bearer ${result.auth.accessToken}`;
    }
    return this.generateApi({
      headers,
      newUrl: `${this.url}/${id}`,
      method: "PUT",
      data: JSON.stringify(data),
      errorMsg: "Error Submit Data",
    });
  }

  async deleteDataById(id: string, isAuth = true) {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (isAuth) {
      const result = await this.refreshToken();
      headers.Authorization = `Bearer ${result.auth.accessToken}`;
    }
    return this.generateApi({
      headers,
      newUrl: `${this.url}/${id}`,
      method: "delete",
      errorMsg: "Error Delete Data",
    });
  }
}

import GeneralApi from "@/api/GeneralApi";
const url = "/task";

class ApiTask extends GeneralApi {
  constructor() {
    super(url);
  }
}

const apiTask = new ApiTask();

export default apiTask;

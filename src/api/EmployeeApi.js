import BaseApi from "./BaseApi";

class EmployeeApi extends BaseApi {
    constructor() {
        super();
        this.controler = "employees";
    }
}

export default new EmployeeApi();
import BaseApi from "./BaseApi";

class DepartmentApi extends BaseApi {
    constructor() {
        super();
        this.controler = "departments";
    }
}

export default new DepartmentApi();
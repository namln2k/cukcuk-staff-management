import BaseApi from "./BaseApi";

class PositionApi extends BaseApi {
    constructor() {
        super();
        this.controler = "positions";
    }
}

export default new PositionApi();
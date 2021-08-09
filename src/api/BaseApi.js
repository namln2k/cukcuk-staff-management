import Repository from "./Repository";

export default class BaseAPI {
    constructor() {
        this.controler = null;
    }
    getAll() {
        return Repository.get(`${this.controler}`);
    }
    getById(id) {
        return Repository.get(`${this.controler}/${id}`);
    }
    add(body) {
        return Repository.post(`${this.controler}`, body);
    }
    update(body) {
        return Repository.put(`${this.controler}`, body);
    }
    delete(id) {
        return Repository.delete(`${this.controler}/${id}`);
    }
}
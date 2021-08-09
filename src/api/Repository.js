import axios from "axios";

const baseDomain = "https://localhost:44363";
const baseURL = `${baseDomain}/api/v1/`;

export default axios.create({
    baseURL,
    headers: {
        "Content-Type" : "application/json-patch+json", 
    },
})
import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5001/clone-5c1a3/us-central1/api' // The API URL (cloud function)
});

export default instance
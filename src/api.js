import API_ENDPOINTS from "@/config";
const API = {
  login: API_ENDPOINTS.apiUrl + "/login",
  register: API_ENDPOINTS.apiUrl + "/register",
  get_user: API_ENDPOINTS.apiUrl + "/user",
};
export default API;

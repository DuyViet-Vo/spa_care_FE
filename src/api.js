import API_ENDPOINTS from "@/config";
const API = {
  login: API_ENDPOINTS.apiUrl + "/login",
  register: API_ENDPOINTS.apiUrl + "/register",
  get_user: API_ENDPOINTS.apiUrl + "/user",
  get_dich_vu: API_ENDPOINTS.apiUrl + "/dich-vu",
  get_lich_hen: API_ENDPOINTS.apiUrl + "/lich-hen",
  get_chi_tiet_lich_hen_bulk: API_ENDPOINTS.apiUrl + "/chi-tiet-lich-hen/bulk",
  get_san_pham: API_ENDPOINTS.apiUrl + "/san-pham",
  get_nhan_vien: API_ENDPOINTS.apiUrl + "/nhan-vien",
};
export default API;

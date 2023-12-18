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
  get_danh_muc: API_ENDPOINTS.apiUrl + "/danh-muc",
  get_uu_dai: API_ENDPOINTS.apiUrl + "/uu-dai",
  get_list_user: API_ENDPOINTS.apiUrl + "/list-user",
};
export default API;

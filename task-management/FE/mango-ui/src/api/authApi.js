import http from "./http";

const getErrorMessage = (err, fallback) => {
  return err.response?.data?.error || fallback;
};

export const authApi = {
  login: async (email, password) => {
    try {
      const response = await http.post("/auth/login", { email, password });
      return response.data;
    } catch (err) {
      throw new Error(getErrorMessage(err, "Đăng nhập thất bại"));
    }
  },

  register: async (fullName, email, password) => {
    try {
      const response = await http.post("/auth/register", { fullName, email, password });
      return response.data;
    } catch (err) {
      throw new Error(getErrorMessage(err, "Đăng ký thất bại"));
    }
  },
};
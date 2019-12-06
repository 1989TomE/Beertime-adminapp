import jwtDecode from "jwt-decode";

export const isLoggedIn = () => {
  try {
    // token must be set, expires in 7 days
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const sevenDaysBefore = new Date().getTime() / 1000 - 3600 * 24 * 7;
    return token !== null && decoded.time > sevenDaysBefore;
  } catch (error) {
    return false;
  }
};

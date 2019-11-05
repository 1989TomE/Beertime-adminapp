import jwtDecode from "jwt-decode";

const Auth = {
  isAuthenticated() {
    try {
      // token must be set, max 3600 sec for session
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      const sevenDaysBefore = new Date().getTime() / 1000 - 3600 * 24 * 7;
      return token !== null && decoded.time > sevenDaysBefore ? true : false;
    } catch (error) {}
  }
};

export { Auth };

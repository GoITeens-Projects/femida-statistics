import axios from "../redux/axiosConfig";

const updateTokens = async () => {
  try {
    const token = localStorage.getItem("token");
    const Oldexpires = localStorage.getItem("expires");

    const discordAuthorized = document.referrer === "https://discord.com/";

    console.log("token:", token, "expires:", Oldexpires);
    console.log("discordAuthorized", discordAuthorized);
    console.log(Date.now() - new Date(Oldexpires).getTime());

    if (Date.now() - new Date(Oldexpires).getTime() > 0 || discordAuthorized) {
      const { data } = await axios.get("/auth/refresh", {
        credentials: "include",
        withCredentials: true
      });
      const expires = new Date(new Date().getTime() + 1000 * 60 * 15);

      console.log("date true:", {
        token: data.accessToken,
        expires: expires
      });
      console.log("date:", data.accessToken);
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("expires", expires);

      // ? open main page
      return true;
    }

    if (!token) {
      //? open login page
      console.log(false, "yy");
      return false;
    }

    if (!token || !Oldexpires || token.length < 7) {
      //? open login page
      console.log("expires");
      return false;
    }
    // console.log("if token:", Date.now() - new Date(Oldexpires).getTime() > 0)

    return true;
  } catch (err) {
    if (err.code === 401) {
      //! this means that even refresh token expired, so we have to login again
      //? open login page
      return true;
    }
    console.log(err);
  }
};

export default updateTokens;

import axios from '../redux/axiosConfig';

const updateTokens = async () => {
  try {
    const json = localStorage.getItem('accessToken');
    console.log(json);
    if (!json) {
      //? open login page
      console.log(false, 'yy');
      return false;
    }
    const { token, expiresAfter } = json;
    if (!token || !expiresAfter || token.length < 7) {
      //? open login page
      return false;
    }
    if (Date.now() - new Date(expiresAfter).getTime() > -1000 * 60 * 2) {
      //* access token already expired, or will expire soon, so we should update it
      const data = await axios.get('/auth/refresh');
      const expires = new Date(new Date().getTime() + 1000 * 60 * 15);
      localStorage.setItem('accessToken', {
        token: data.accessToken,
        expiresAfter: expires,
      });
      //? open main page
      return true;
    }
    return true;
  } catch (err) {
    if (err.code === 401) {
      //! this means that even refresh token expired, so we have to login again
      //? open login page
      return false;
    }
    console.log(err);
  }
};

export default updateTokens;

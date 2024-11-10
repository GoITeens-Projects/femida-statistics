import axios from '../redux/axiosConfig';

const updateTokens = async () => {
  try {
    const token = localStorage.getItem('token');
    const expires = localStorage.getItem('expires');
    console.log('token:', token, 'expires:' ,expires);
    console.log(Date.now() - new Date(expires).getTime());
    if (!token) {
      //? open login page
      console.log(false, 'yy');
      return false;
    }
    // const { token, expiresAfter } = json;
    if (!token || !expires || token.length < 7) {
      //? open login page
      console.log(
        'expires'
      );
      return false;
    }
    // if (Date.now() - new Date(expires).getTime() > -1000 * 60 * 2) {
      //* access token already expired, or will expire soon, so we should update it
      const data = await axios.get('/auth/refresh');
      // const expires = new Date(new Date().getTime() + 1000 * 60 * 15);
      // console.log("date true:",  {
      //   token: data.accessToken,
      //   expires: expires,
      // } );
      // localStorage.setItem('token', data.accessToken);
      // localStorage.setItem('expires', expires);
      
      //? open main page
      // return false;
    // }
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

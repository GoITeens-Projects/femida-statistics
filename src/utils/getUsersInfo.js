import axios from 'axios';

export const getUsersInfo = async ids => {
  console.log("ids:", ids);
  const accessToken = localStorage.getItem('token');
  let config = {
    method: 'get',
    url: `https://femida-api.onrender.com/discord/usernames?ids=${ids}`,
    headers: {
        'Authorization': `Bearer ${accessToken}`,
    },}
  const {data} = await axios.request(config)
  // const users = ids.map(async userId => {
  //   setTimeout(async () => {
  //     try {
  //       const { username, global_name, id, avatar } = await axios.get(
  //         `https://discord.com/api/v10/users/${userId}`,
  //         {
  //           headers: {
  //             Authorization: `Bot ${process.env.REACT_APP_FEMIDA_TOKEN}`,
  //           },
  //         }
  //       );
  //       const user = {
  //         username,
  //         globalName: global_name,
  //         id,
  //         avatar: `https://cdn.discordapp.com/avatars/${avatar}`,
  //       };
  //       return user;
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }, 500);
  // });
  console.log("users:", data.users);
  return data.users;
};

// export default getUsersInfo;

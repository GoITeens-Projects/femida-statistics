import axios from "axios";
// export const getUsersInfo = async (userId) =>{
// const response = await fetch(
//     `https://discord.com/api/v10/users/${userId}`,
//     {
//       headers: {
//         Authorization: `Bot ${process.env.REACT_APP_FEMIDA_TOKEN}`,
//       },
//     }
//   );
//   return response
// } stats/usernames?ids={ids}

export const getUsersInfo = async (ids) => {
  const accessToken = localStorage.getItem('token');

  let config = {
    method: 'get',
    url: `https://femida-api.onrender.com/stats/usernames?ids=${ids}`,
    headers: {
        'Authorization': `Bearer ${accessToken}`,
    },
};

  const { data } = await axios.request(config)
    // const users = ids.map(async ({id: userId}) => {
    //   setTimeout(async () => {
    //     const { username, global_name, id, avatar } = await axios.get(
    //       `https://discord.com/api/v10/users/${userId}`,
    //       {
    //         headers: {
    //           Authorization: `Bot ${process.env.REACT_APP_FEMIDA_TOKEN}`,
    //         },
    //       }
    //     );
    //     const user = {
    //       username,
    //       globalName: global_name,
    //       id,
    //       avatar: `https://cdn.discordapp.com/avatars/${avatar}`,
    //     };
    //     return user;
    //   }, 500);
    // });
    return data.users;
  };
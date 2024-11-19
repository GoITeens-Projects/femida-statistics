import axios from 'axios';

const getUsersInfo = ids => {
  const users = ids.map(async userId => {
    setTimeout(async () => {
      try {
        const { username, global_name, id, avatar } = await axios.get(
          `https://discord.com/api/v10/users/${userId}`,
          {
            headers: {
              Authorization: `Bot ${process.env.REACT_APP_FEMIDA_TOKEN}`,
            },
          }
        );
        const user = {
          username,
          globalName: global_name,
          id,
          avatar: `https://cdn.discordapp.com/avatars/${avatar}`,
        };
        return user;
      } catch (err) {
        console.error(err);
      }
    }, 500);
  });
  return users;
};

export default getUsersInfo;

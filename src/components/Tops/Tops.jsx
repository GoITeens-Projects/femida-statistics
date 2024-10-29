import styles from './Tops.module.css';
import TopSection from 'components/TopSection/TopSection';
import { selectMessagesLogs} from '../../redux/statistics/selectors';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


const TopChannels = () => {
  const messegesLogs = useSelector(selectMessagesLogs)
   const [users, setUser] = useState([]);

   useEffect(() => {
       const fetchUser = async (user) => {
           const response = await fetch(`https://discordlookup.mesalytic.moe/v1/user/${user.id}`);

           const data = await response.json();
           console.log("data:", data);
          users.push( { userAvatarUrl: data.avatar.link,
                                 userName: data.global_name ? data.global_name : data.username,
                                 messagesQuantity: user.count,
                                 id: user.id})
                                 console.log(users, messegesLogs.length * 2 === users.length);                   
       };
       messegesLogs.forEach(log => {
        fetchUser(log)
        
       }
      )  
    }, [])
   

  return (
    <>
      <div className={`${styles.topsBox}`}>
        {messegesLogs.length * 2 === users.length && <>
        <TopSection toArr={users} title={'Топ учасників'} isChannel={false} />
        <TopSection toArr={users} title={'Топ каналів'} isChannel={true} />
        </>
         }
        
          
      </div>
    </>
  );
};

export default TopChannels;

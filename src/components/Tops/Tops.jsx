import styles from './Tops.module.css';
import TopSection from 'components/TopSection/TopSection';
import { selectMessagesLogs} from '../../redux/statistics/selectors';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';


const TopChannels = () => {
  const messegesLogs = useSelector(selectMessagesLogs)
  const users = []
  //  const [users, setUser] = useState([]);
   const [counter, setCounter] =  useState([])
   const currLogs = messegesLogs.slice(0,10)
  //  let counter = 0

   useEffect(() => {
    if(counter){
      console.log("counter");
      return
    }
    setCounter(1)
       const fetchUser = async (user) => {
           const response = await fetch(`https://discordlookup.mesalytic.moe/v1/user/${user.id}`);

           const data = await response.json();
           console.log("data:", data);
          users.push( { userAvatarUrl: data.avatar.link,
                                 userName: data.global_name ? data.global_name : data.username,
                                 messagesQuantity: user.count,
                                 id: user.id})
                                 console.log(users, currLogs.length === users.length);                   
       };
       console.log(messegesLogs);
       console.log(currLogs);
       currLogs.forEach(log => {
        fetchUser(log)
        
       }
      )  
    }, [counter, currLogs, messegesLogs, users])
   

  return (
    <>
      <div className={`${styles.topsBox}`}>
        {currLogs.length === users.length && <>
        <TopSection toArr={users} title={'Топ учасників'} isChannel={false} />
        <TopSection toArr={users} title={'Топ каналів'} isChannel={true} />
        </>
         }
        
          
      </div>
    </>
  );
};

export default TopChannels;

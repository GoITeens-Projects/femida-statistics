import React from 'react';
import styles from './MessageBubble.module.css';
import { getUsersInfo } from 'utils/getUsersInfo';
import { useState, useEffect } from 'react';

// function HighlightAndReplace({ text, initialWordsToHighlight }) {
//   const [wordsToHighlight, setWordsToHighlight] = useState(initialWordsToHighlight);
//   const [highlightedText, setHighlightedText] = useState(text);

//   // Функция для замены слова
//   const replaceWord = (oldWord, newWord) => {
//     // Обновляем состояние текста
//     const newText = highlightedText.replace(new RegExp(oldWord, 'gi'), newWord);
//     setHighlightedText(newText);
    
//     // Обновляем состояние слов для выделения
//     setWordsToHighlight(prevWords => 
//       prevWords.map(word => word.toLowerCase() === oldWord.toLowerCase() ? newWord : word)
//     );
//   };}

export const MessageBubble = ({
  message,
  type = 'basic',
  className = '',
  mentions = [],
  emojis = []
}) => {
  const [usernames, setUsernames] = useState({});
  const [images, setImages] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUsernames = async () => {
      if (mentions.length > 0) {
        setIsLoading(true);
        try {
          const ids = mentions.map(mention => mention.id);
          const users = await getUsersInfo(ids.join(','));
          const usernamesMap = {};
          users.forEach(user => {
            usernamesMap[user.id] = user.username;
          });
          setUsernames(usernamesMap);

          let imagesMap = {}
          emojis.forEach(image=>{
            imagesMap[image.emoji] = image.url
          });
          setImages(imagesMap)
        } catch (error) {
          console.error('Error fetching usernames:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUsernames();
  }, [mentions]);

  const formattedMessage = message;
  const wordsToHighlight = mentions.map(mention => mention.mention);
  const emojiToReplase = emojis.map(emoji => emoji.emoji)
  const forReplasement = [...wordsToHighlight, ...emojiToReplase]
  const regex = new RegExp(`(${forReplasement.join('|')})`, 'gi');
  const parts = formattedMessage.split(regex);

  return (
    <div className={`${styles.messageContainer} ${styles[type]} ${className}`}>
      <div className={styles.messageBubble}>
       <p className={styles.text}>{parts.map((part, index) => {
        console.log('part', part)
        // Проверяем, является ли текущая часть словом для выделения
        const isHighlighted = forReplasement.some(
          word => word.toLowerCase() === part.toLowerCase()
        );


        if(isHighlighted) {
          // Находим соответствующий mention для получения ID
          // let repType = 'user'
          const mention = mentions.find(m => m.mention.toLowerCase() === part.toLowerCase());
          

          
if(mention){
          const username = mention && usernames[mention.id] ? usernames[mention.id] : part;
          
          return (
            <span key={index} className={styles.highlight}>
              @{username}
            </span>
          );
        }else{
const picture = emojis.find(e => e.emoji.toLowerCase() === part.toLowerCase());
console.log('picture', picture)

          const imageUrl = picture && picture.url ? picture.url : part;

 return (
            <img className={styles.emoji} src={imageUrl}/>
          );
        }
        }

        return (
          <React.Fragment key={index}>
            {part}
          </React.Fragment>
        );
      })}</p>
      </div>
    </div>
  );
};
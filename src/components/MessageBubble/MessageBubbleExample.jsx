import React, { useState } from 'react';
import {MessageBubble} from './MessageBubble';
import styles from './MessageBubbleExample.module.css';

const MessageBubbleExample = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Привіт! Як справи?', type: 'incoming' },
    { id: 2, text: 'Привіт! Все добре, дякую! А у тебе як?', type: 'outgoing' },
    { id: 3, text: 'Теж все чудово! Що плануєш на вихідні?', type: 'incoming' },
    { id: 4, text: 'Думаю піти в кіно або на прогулянку в парк. А ти?', type: 'outgoing' },
    { id: 5, text: 'Звучить чудово! Можливо, приєднаюся 😊', type: 'incoming' }
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        text: newMessage,
        type: 'outgoing'
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        <h3>Приклад повідомлень у месенджері</h3>
      </div>
      
      <div className={styles.messagesContainer}>
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message.text}
            type={message.type}
          />
        ))}
      </div>
      
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Введіть повідомлення..."
          className={styles.messageInput}
        />
        <button 
          onClick={handleSendMessage}
          className={styles.sendButton}
          disabled={!newMessage.trim()}
        >
          Відправити
        </button>
      </div>
    </div>
  );
};

export default MessageBubbleExample;
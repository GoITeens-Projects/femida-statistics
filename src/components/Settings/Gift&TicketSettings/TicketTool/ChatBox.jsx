import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {getTicketById} from '../../../../redux/ticketTool/operation';
import {useState} from 'react';
import { useSelector } from 'react-redux';
import {MessageBubble} from '../../../MessageBubble/MessageBubble';
import s from './ChatBox.module.css';

export const ChatBox = ({ ticketId }) => {
    const dispatch = useDispatch();
    const ticketsChats = useSelector(state => state.ticketTool.ticketsChats);
    const ticketChat = ticketsChats[ticketId];
    console.log('ticketChat', ticketChat?.chat[0]?.chat);
    const currentChat = ticketChat?.chat[0]
    const revMessages = currentChat?.chat
    const messages = revMessages

    useEffect(()=>{
       dispatch(
getTicketById(ticketId)
       )
       console.log('getTicketById', ticketId);
    }, [dispatch, ticketId]);
    return <>
    <div>
        {messages?.map((message, index) => {
            return <div key={index}>
                <img src={message.author.avatar} alt={message.author.username} className={s.avatar}/>
                <p className={s.username}>{message.author.username}</p>
                {message.isForwarded && <p className={s.forwardedFrom}>Переслано</p>}
                {message.attachments?.map((att, idx) => {
                    return <img key={idx} src={att} alt={`attachment-${idx}`} className={s.attachment} />
                })}
                {message.content.length > 0 && <MessageBubble key={index} type={message.isForwarded ? 'forwarded' : 'basic'} message={message.content} mentions={message.mentions} emojis={message.customEmojis}/> }
            </div>;
        })}
    </div>
    </>
}

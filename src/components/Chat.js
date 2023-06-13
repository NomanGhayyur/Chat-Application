import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from 'firebase/firestore'
import { auth, db } from "../firebase-config";
import '../styles/Chat.css'

export const Chat = (props) => {

    const { room } = props;

    const [newMessage, setNewMessage] = useState("")
    const [messages, setMessages] = useState([])

    const messagesRef = collection(db, 'messages')


    useEffect(() => {
        const queryMessages = query(
            messagesRef,
            where('room', '==', room),
            orderBy('createdAt')
        );
        const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id })
            })
            setMessages(messages)
        })
        return () => unsubscribe()
    }, [messagesRef, room]
    )
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newMessage === "") return;

        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room,
        });
        setNewMessage("")
    }



    return (
        <div className="chat-app">
            <div className="header">
                <h1>Welcome to {room.toUpperCase()}</h1>

            </div>
            <div className="messages">
                {messages.map((msg) =>
                    <div className="message" key={msg.id}>
                        <span className="user">{msg.user}:</span>
                        <span >{msg.text}</span>
                    </div>
                )}
            </div>
            <form className="new-message-form" onSubmit={handleSubmit}>
                <input className="new-message-input" placeholder="Type your message here.." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
                <button className="send-button" type="submit">Send</button>
            </form>
        </div>
    )
}
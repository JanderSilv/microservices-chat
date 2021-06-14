import React, { useState, useEffect, useRef } from 'react';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';

interface IMessage { user: string, message: string }

const Chat = () => {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [chat, setChat] = useState<IMessage[]>([]);
  const latestChat = useRef<any | null>(null);
  const [connected, setConnected] = useState(false);

  latestChat.current = chat;

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:5001/hubs/chat')
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

<<<<<<< HEAD
    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    console.log('Connected!');
    
                    connection.on('Receive', (message:IMessage) => {
                        const updatedChat = [...latestChat.current];
                        updatedChat.push(message);
                        console.log(message)
                        setChat(updatedChat);
                    });
=======
  useEffect(() => {
    if (connection) {
      connection.start()
        .then(result => {
          console.log('Connected!');
>>>>>>> 3b870e10376b0bbd65c7bd9b34328d104f850542

          connection.on('ReceiveMessage', (message: IMessage) => {
            const updatedChat = [...latestChat.current];
            updatedChat.push(message);

            setChat(updatedChat);
          });

          setConnected(true);
        })
        .catch(e => console.log('Connection failed: ', e));
    }
  }, [connection]);

  const sendMessage = async (user: string, message: string) => {
    const chatMessage = {
      user: user,
      message: message
    };

    if (connected) {
      try {
        await connection?.send('SendMessage', chatMessage);
      }
      catch (e) {
        console.log(e);
      }
    }

  }

  return (
    <div>
      <ChatInput sendMessage={sendMessage} />
      <hr />
      <ChatWindow chat={chat} />
    </div>
  );
};

export default Chat;
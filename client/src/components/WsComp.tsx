import React, { useEffect, useState } from 'react';
import SocketStart from '../api/socket';


type socket = WebSocket | null
type Res = {
  type: number;
  body: string;
};

const WebSocketComponent: React.FC = () => {
  const [socket, setSocket] = useState<socket>(null);
  const [message, setMessage] = useState<string>('');
  const [received, setReceived] = useState<Res>({ type: 0, body: '' });
  const [messages, setMessages] = useState<[string]>([''])

  useEffect(() => {
    SocketStart(setReceived,setSocket)
    // const newSocket = new WebSocket('ws://localhost:3006/ws');

    // newSocket.addEventListener('open', (event) => {
    //   console.log('WebSocket opened');
    // });

    // newSocket.addEventListener('message', (event) => {
    //   const receivedData: Res = JSON.parse(event.data);
    //   setReceived(receivedData);
    //   console.log('Received:', receivedData);
    // });

    // newSocket.addEventListener('error', (event) => {
    //   console.error('WebSocket error:', event);
    // });

    // newSocket.addEventListener('close', (event) => {
    //   console.log('WebSocket closed:', event);
    // });

    // setSocket(newSocket);

    // return () => {
    //   newSocket.close();
    // };
    // //setMessages()
  }, []);

  const sendMessage = () => {
    if (socket) {
      socket.send(JSON.stringify(message));
    }
  };

  return (
    <div>
      <p>Received Message: {received.body}</p>
      <input onChange={(e) => setMessage(e.target.value)} type="text" />
      <button
        className='bg-indigo-600 rounded-md p-2 text-white m-2 hover:bg-indigo-400'
        onClick={sendMessage}
      >
        Send Message
      </button>
    </div>
  );
};

export default WebSocketComponent;

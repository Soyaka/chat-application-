import React, { useEffect, useState } from 'react';
import SocketStart from '../api/socket';

type socket = WebSocket | null;
type Res = {
  type: number;
  body: string;
};

const WebSocketComponent: React.FC = () => {
  const [socket, setSocket] = useState<socket>(null);
  const [message, setMessage] = useState<string>('');
  const [received, setReceived] = useState<Res>({ type: 0, body: '' });
  const [messages, setMessages] = useState<Res[]>([{ type: 1, body: 'Hello' }]);

  useEffect(() => {
    SocketStart(setReceived, setSocket, setMessages);
  }, []);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("clicked")
    e.preventDefault();
    if (socket) {
      socket.send(message);
      setMessage('')
    } else {
      console.log('no connection');
    }
  };

  return (
    <div className='flex flex-col relative top-4'>
      <div className='flex-1'>
        {messages?.map((msg, i) => (
          <div key={i} className='relative w-fit h-8 rounded-md bg-sky-500 text-white m-2 p-1'>
            {msg.body}
          </div>
        ))}
      </div>

      <div className='flex flex-row items-center justify-center'>
        <form onSubmit={(e) => sendMessage(e)} action=''>
          <input
            type='text'
            onChange={(e) => setMessage(e.target.value)}
            placeholder='Set message'
            className='rounded-xl p-2'
            value={message}
          />
          <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-xl ml-2'>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default WebSocketComponent;

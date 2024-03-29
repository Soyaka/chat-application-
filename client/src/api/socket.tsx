type socket = WebSocket | null
type socket_tp = React.Dispatch<React.SetStateAction<socket>>
type reciever_tp = React.Dispatch<React.SetStateAction<Res>>
type reciever_list = React.Dispatch<React.SetStateAction<Res[]>>
type Res = {
    type: number;
    body: string;
  };

export default function SocketStart( setReceived:reciever_tp, setSocket:socket_tp , setMessages : reciever_list){

    const newSocket = new WebSocket('ws://localhost:3006/ws');

    newSocket.addEventListener('open', (event) => {
      console.log('WebSocket opened',event);
    });

    newSocket.addEventListener('message', (event) => {
      const receivedData: Res = JSON.parse(event.data);
      setReceived(receivedData);
      setMessages((prevMessages : Res[] ) => [...prevMessages, receivedData]);
      console.log('Received:', receivedData);
    });

    newSocket.addEventListener('error', (event) => {
      console.error('WebSocket error:', event);
    });

    newSocket.addEventListener('close', (event) => {
      console.log('WebSocket closed:', event);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
}
import io from "socket.io-client";
import { useState, useEffect } from "react";

// creating the socket server using socket.io
const socket = io("/");

const App = () => {
  //state
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  // useEffect to listen to the message event
  useEffect(() => {
    socket.on("message", receiveMessage);

    return () => {
      socket.off("message", receiveMessage);
    };
  }, []);

  // hanlde submit to send the message
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(messages);
    console.log(message);

    const newMessage = {
      body: message,
      from: "ME",
    };

    setMessages([...messages, newMessage]);
    socket.emit("chat", message);
  };

  // receive message function
  const receiveMessage = (message) =>
    setMessages((state) => [message, ...state]);

  // return
  return (
    <div className="h-screen bg-zinc-800 text-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-zinc-900 p-10">
        <h1 className="text-2xl font-bold my-2">Web sockets APP</h1>
        <input
          className="border-2 border-zinc-500 p-2 w-full text-black"
          type="text"
          placeholder="Enter your message"
          onChange={(e) => setMessage(e.target.value)}
        ></input>
        <input
          className="border-2 border-rose-400 text-center p-2 mt-2 w-full bg-rose-400 hover:bg-rose-500 transition duration-300 ease-in-out cursor-pointer"
          type="submit"
          value="Send"
        ></input>
        <ul className="flex flex-col gap-3 mt-5">
          {messages.map((msj, index) => (
            <li className={`"my-15 p-2 table text-sm rounded-md" ${msj.from == 'ME' ? 'bg-sky-700' : 'bg-gray-500 ml-auto'}`} key={index}>
              {msj.from}: {msj.body}
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
};

export default App;

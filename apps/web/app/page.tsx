"use client";
import { SendHorizonal } from "lucide-react";
import React, { useState } from "react";
import { useSocket } from "../context/SocketProvider";

const page = () => {
  const { sendMessage, messages } = useSocket();
  const [message, setMessage] = useState("");
  return (
    <div className="text-center px-32 md:px-36 lg:px-96 py-12 flex flex-col h-screen">
      <h1 className="text-5xl font-sans font-semibold">Welcome to Gossiper</h1>
      <div className="flex-grow my-8 w-full overflow-y-scroll">
        {messages.map((message, index) => (
          <p
            key={index}
            className="text-left bg-blue-500 max-w-[45%] text-wrap px-4 py-2 mb-2 rounded-t-md rounded-r-md"
          >
            {message}
          </p>
        ))}
      </div>
      <div className="flex items-center justify-center gap-4">
        <input
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          className="p-2 w-full rounded-md focus:outline-none text-black"
          placeholder="send message..."
        />
        <button
          onClick={() => sendMessage(message)}
          className="bg-blue-500 hover:bg-blue-400 transition-all p-2 rounded-full"
        >
          <SendHorizonal />
        </button>
      </div>
    </div>
  );
};

export default page;

import React, { useRef } from "react";
import { WSS_PORT } from "helpers/constants/Websockets";
import { useDispatch, useSelector } from "react-redux";
import { pushNewsCall, popNewsCall } from "redux/apiCalls/newsCalls";

const WebSocketListener = () => {
  const socketRef = useRef(null);
  const dispatch = useDispatch();
  const controller = useSelector((state) => state.news);
  const { recentNews } = controller;
  const connectToWebSocket = () => {
    socketRef.current = new WebSocket(`ws://localhost:${WSS_PORT}`); // Replace with your WebSocket server URL

    socketRef.current.onopen = () => {
      console.log("Connected to the WebSocket server");
    };

    socketRef.current.onmessage = async (event) => {
      const newsData = JSON.parse(event.data);
      if (recentNews.length >= 10) {
        await popNewsCall(dispatch);
      }
      await pushNewsCall(dispatch, newsData[0]);
      
      console.log("Received news data:", newsData[0]);
    };

    socketRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socketRef.current.onclose = (event) => {
      console.log("WebSocket connection closed:", event.code, event.reason);
      setTimeout(connectToWebSocket, 5000);
    };
  };

  connectToWebSocket();
  return () => {
    if (socketRef.current) {
      socketRef.current.close();
    }
  };
};

export default WebSocketListener;

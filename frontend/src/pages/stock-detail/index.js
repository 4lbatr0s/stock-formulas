import StockCard from 'components/cards/Stock/index';
import React from 'react';
import { useLocation} from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
// Custom hook to manage WebSocket logic
const useWebSocket = (symbol, setCurrentPrice) => {
  const socket = useRef(null);

  useEffect(() => {
    const backendWebSocketURL = 'ws://localhost:5080';
    socket.current = new WebSocket(backendWebSocketURL);

    socket.current.onopen = () => {
      socket.current.send(JSON.stringify(symbol));
      console.log('Connection is established from frontend!');
    };

    socket.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setCurrentPrice(data?.p);
    };

    return () => {
      // Clean up the WebSocket on component unmount
      if (socket.current) {
        socket.current.close();
      }
    };
  }, [symbol, setCurrentPrice]);
  
};

const StockDetail = () => {
  const { pathname } = useLocation();
  const stockSymbol = pathname.split('/').pop();
  const [currentPrice, setCurrentPrice] = useState('N/A');
  useWebSocket(stockSymbol, setCurrentPrice);
  console.log('location:', pathname);
  // const getStockCard = () => {
  //   const newsId = pathname.split('/').pop();
  //   const { id, headline, imageAlt, symbols, content } = fakeNews.find((fn) => fn.id == newsId);
  //   return <StockCard id={id} headline={headline} content={content} imageAlt={imageAlt} symbols={symbols} />;
  // };

  return (
    <>
      <StockCard symbol={stockSymbol} currentPrice={currentPrice}></StockCard>
    </>
  );
};

export default StockDetail;

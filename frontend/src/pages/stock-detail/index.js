import StockCard from 'components/cards/Stock/index';
import React from 'react';
import { useLocation } from 'react-router-dom';

const StockDetail = () => {
  const { pathname } = useLocation();
  console.log('location:', pathname);
  const stockSymbol = pathname.split('/').pop();
  // const getStockCard = () => {
  //   const newsId = pathname.split('/').pop();
  //   const { id, headline, imageAlt, symbols, content } = fakeNews.find((fn) => fn.id == newsId);
  //   return <StockCard id={id} headline={headline} content={content} imageAlt={imageAlt} symbols={symbols} />;
  // };

  return (
    <>
      <StockCard symbol={stockSymbol}></StockCard>
    </>
  );
};

export default StockDetail;

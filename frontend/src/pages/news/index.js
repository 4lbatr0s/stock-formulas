import NewsCard from 'components/cards/news/NewsCard';
import fakeNews from 'layout/MainLayout/Drawer/NewsDrawerContent/fakeNews';
import React from 'react';
import { useLocation } from 'react-router-dom';
export default function News() {
  const { pathname } = useLocation();
  console.log('location:', pathname);

  const getNewsCard = () => {
    const newsId = pathname.split('/').pop();
    const { id, headline, imageAlt, symbols, content } = fakeNews.find((fn) => fn.id == newsId);
    return <NewsCard id={id} headline={headline} content={content} imageAlt={imageAlt} symbols={symbols} />;
  };

  return <>{getNewsCard()}</>;
}

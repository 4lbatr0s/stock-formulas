import React from 'react';
import Stack from '@mui/material/Stack';
import TunnelNewsCard from 'components/cards/news/TunnelNewsCard';
import fakeNews from './fakeNews';
import genericNewsImage from '../../../../assets/images/news/generic.webp';
const FinancialNewsDrawerContent = () => {
  const renderDummyNews = () => {
    return fakeNews.reduce((acc, news) => {
      acc.push(<TunnelNewsCard key={news.id} id={news.id} image={genericNewsImage} headline={news.headline} imageAlt="QuantumFin" />);
      return acc; 
    }, []);
  };
  return <Stack direction="column">{renderDummyNews()}</Stack>;
};

export default FinancialNewsDrawerContent;

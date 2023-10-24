import React from 'react';
import Stack from '@mui/material/Stack';
import TunnelNewsCard from 'components/cards/news/TunnelNewsCard';
import genericNewsImage from '../../../../assets/images/news/generic.webp';
const FinancialNewsDrawerContent = ({ news }) => {
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  const renderDummyNews = () => {
    if (news && news.length > 0) {
      return news.reduce((acc, news) => {
        acc.push(
          <TunnelNewsCard
            key={news._id || Math.random()}
            id={news._id || Math.random()}
            image={genericNewsImage}
            headline={truncateText(news?.summary || news, 50) || 'N/A'}
            imageAlt="QuantumFin"
          />
        );
        return acc;
      }, []);
    }
  };
  return <Stack direction="column">{renderDummyNews()}</Stack>;
};

export default FinancialNewsDrawerContent;

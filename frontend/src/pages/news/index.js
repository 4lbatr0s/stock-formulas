import NewsCard from 'components/cards/news/NewsCard';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '../../../node_modules/@tanstack/react-query/build/lib/useQuery';
import { fetchNewsById } from 'store/query/StockQueries';
import { CircularProgress } from '../../../node_modules/@mui/material/index';
export default function News() {
  const { pathname } = useLocation();
  const newsId = pathname.split('/').pop();
  const {
    data: news,
    isLoading: isLoadingNewsById,
    isError: isErrorNewsById
  } = useQuery(['newsById', newsId], async () => {
    if (newsId) {
      const response = await fetchNewsById(newsId);
      return response;
    }
  });

  const getNewsCard = () => {
    const { id, headline="N/A", imageAlt, symbols, summary:content } = news;
    return <NewsCard id={id} headline={headline} content={content} imageAlt={imageAlt} symbols={symbols} />;
  };

  const conditonalRendering = (isLoading, isError) => {
    if (isLoading) {
      return <CircularProgress />;
    } else if (isError) {
      return <div> Error </div>;
    } else {
      return getNewsCard();
    }
  };

  return <>{conditonalRendering(isLoadingNewsById, isErrorNewsById)}</>;
}

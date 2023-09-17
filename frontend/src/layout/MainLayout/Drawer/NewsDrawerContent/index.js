import React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import NewsCard from 'components/cards/news/NewsCard';

const NewsDrawerContent = () => {
  return (
    <Box>
      <Stack direction="column">
        <NewsCard title="Test Title" image="https://example.com/image.jpg" imageAlt="Alt text" content="This is some test content." />{' '}
      </Stack>
    </Box>
  );
};

export default NewsDrawerContent;

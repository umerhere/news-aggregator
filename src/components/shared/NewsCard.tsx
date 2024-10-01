import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';

interface NewsCardProps {
  article: {
    title: string;
    description: string;
    publishedAt: string;
    url: string;
    urlToImage?: string;
    source: {
      name: string;
    };
  };
}

export const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  return (
    <Card style={{ marginBottom: '20px' }}>
      {article.urlToImage && (
        <CardMedia component="img" image={article.urlToImage} alt={article.title} />
      )}
      <CardContent>
        <Typography variant="h5" component="div">
          {article.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {article.description}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {new Date(article.publishedAt).toLocaleDateString()} - {article.source.name}
        </Typography>
      </CardContent>
    </Card>
  );
};

import React, { useEffect, useState } from 'react';
import {
  Card, CardContent, Typography, Grid, Container, Button, CircularProgress
} from '@mui/material';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { RootState } from 'store/index';
import { fetchData } from 'api/fetchArticles';

const ForYou: React.FC = () => {
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [visibleCount, setVisibleCount] = useState(20);
  const { preferredAuthor, preferredCategory, preferredSource } = useSelector(
    (state: RootState) => state.settingsSlice
  );

  useEffect(() => {
    const applyUserFilters = async () => {
      setLoading(true);
      try {
        const articles = await fetchData(null, null, preferredSource);
  
        const filtered = articles.filter((article: Article) => {
          const matchesAuthor =
            preferredAuthor === 'All' || (article.author && article.author.toLowerCase() === preferredAuthor.toLowerCase());
          const matchesCategory =
            preferredCategory === 'All' || (article.category && article.category.toLowerCase() === preferredCategory.toLowerCase());
          const matchesSource =
            preferredSource === 'All' || (article.source && article.source.toLowerCase() === preferredSource.toLowerCase());
          return matchesAuthor || matchesCategory || matchesSource;
        });
  
        setFilteredArticles(filtered);
      } catch (error) {
        console.error('Error fetching filtered articles: ', error);
      } finally {
        setLoading(false);
      }
    };
  
    applyUserFilters();
  }, [preferredAuthor, preferredCategory, preferredSource]);
  
  const loadMoreArticles = () => {
    if (loadingMore) return;
    setLoadingMore(true);
    const nextCount = visibleCount + 20;
    setVisibleCount(nextCount);
    setFilteredArticles((prevArticles) => filteredArticles.slice(0, nextCount));
    setLoadingMore(false);
  };

  return (
    <Container>
      <Grid container spacing={2} justifyContent="center" style={{ marginBottom: '20px' }}>
        <Typography variant="h4" component="h1">
          Articles For You
        </Typography>
      </Grid>

      <Grid container spacing={2}>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          filteredArticles.length > 0 ? (
            filteredArticles.slice(0, visibleCount).map((article, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{article.title}</Typography>
                    <Typography variant="body2">{article.description}</Typography>
                    <Typography variant="body2">Author: {article.author || 'Unknown'}</Typography>
                    <Typography variant="body2">Source: {article.source}</Typography>
                    <Typography variant="body2">Published At: {dayjs(article.publishedAt).format('MMM D, YYYY')}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography>No articles match your preferences.</Typography>
          )
        )}
      </Grid>

      {/* Load More Button */}
      {!loading && filteredArticles.length > visibleCount && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          {loadingMore ? (
            <CircularProgress />
          ) : (
            <Button variant="contained" onClick={loadMoreArticles}>
              Load More
            </Button>
          )}
        </div>
      )}
    </Container>
  );
};

export default ForYou;

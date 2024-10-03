// src/pages/Home.tsx

import React, { useEffect, useState } from 'react';
import {
  Card, CardContent, Typography, Grid, Container, TextField, Button, MenuItem, Select,
  InputLabel, FormControl, CircularProgress
} from '@mui/material';
import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { fetchData } from 'api/fetchArticles';

const Home: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedSource, setSelectedSource] = useState('All');
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(50);
  const sources = ['All', 'NewsAPI', 'NYTimes', 'The Guardian'];

  const handleSearch = () => {
    setLoading(true);
    setError(null);
    setVisibleCount(50);
    fetchData(searchTerm, selectedDate?.format('YYYY-MM-DD') || null, selectedSource)
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch articles. Please try again later.');
        console.error(err);
        setLoading(false);
      });
  };

  const handleReset = () => {
    setLoading(true);
    setSearchTerm('');
    setSelectedDate(null);
    setSelectedSource('All');
    setError(null);
    setVisibleCount(50);
    fetchData('technology', null, 'All')
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch articles. Please try again later.');
        console.error(err);
        setLoading(false);
      });
  };

  const loadMoreArticles = () => {
    if (loadingMore) return;
    setLoadingMore(true);
    const nextCount = visibleCount + 50;
    setVisibleCount(nextCount);
    fetchData(searchTerm, selectedDate?.format('YYYY-MM-DD') || null, selectedSource)
      .then((data) => {
        setArticles((prevArticles) => [...prevArticles, ...data]);
        setLoadingMore(false);
      })
      .catch((err) => {
        setError('Failed to fetch articles. Please try again later.');
        console.error(err);
        setLoadingMore(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchData('technology', null, 'All')
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch articles. Please try again later.');
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <Container>
      <Grid container spacing={2} justifyContent="center" style={{ marginBottom: '20px' }}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Search articles"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Date"
              value={selectedDate}
              onChange={(newDate) => setSelectedDate(newDate)}
              slotProps={{
                textField: { fullWidth: true },
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel id="source-label">Source</InputLabel>
            <Select
              labelId="source-label"
              id="source"
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
            >
              {sources.map((source) => (
                <MenuItem key={source} value={source}>
                  {source}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button 
            variant="contained" 
            fullWidth 
            onClick={handleSearch} 
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button 
            variant="outlined" 
            fullWidth 
            onClick={handleReset} 
            disabled={loading}
          >
            Reset
          </Button>
        </Grid>
      </Grid>

      {/* Display error message */}
      {error && (
        <Typography color="error" variant="body1">
          {error}
        </Typography>
      )}

      {/* Display loading message */}
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Grid container spacing={2}>
          {articles.slice(0, visibleCount).map((article, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{article.title}</Typography>
                  <Typography variant="body2">{article.description}</Typography>
                  <Typography variant="body2">Source: {article.source}</Typography>
                  <Typography variant="body2">Published At: {article.publishedAt}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Load More Button */}
      {!loading && articles.length > visibleCount && (
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

export default Home;

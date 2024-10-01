// src/Home.tsx

import React, { useEffect, useState } from 'react';
import {
  Card, CardContent, Typography, Grid, Container, TextField, Button, MenuItem, Select,
  InputLabel, FormControl
} from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { fetchData } from 'api/fetchArticles';

const Home: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedSource, setSelectedSource] = useState('All');
  const sources = ['All', 'NewsAPI', 'NYTimes', 'The Guardian'];

  const handleSearch = () => {
    setLoading(true);
    fetchData(searchTerm, selectedDate?.format('YYYY-MM-DD') || null, selectedSource)
      .then((data) => {
        setArticles(data);
        setLoading(false);
      });
  };

  const handleReset = () => {
    setLoading(true);
    setSearchTerm('');
    setSelectedDate(null);
    setSelectedSource('All');
    fetchData('technology', null, 'All').then((data) => {
      setArticles(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    setLoading(true);
    fetchData('technology', null, 'All').then((data) => {
      setArticles(data);
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

      <Grid container spacing={2}>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          articles.map((article, index) => (
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
          ))
        )}
      </Grid>
    </Container>
  );
};

export default Home;

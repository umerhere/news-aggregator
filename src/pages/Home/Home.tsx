import React, { useState, useEffect } from 'react';
import { NewsCard } from './components/Card';
import { Article } from './types';
import { TextField, Autocomplete, MenuItem, Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { CONSTANTS } from '../../core/constants';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { useAppSelector } from '../../store/hooks'
import { loadNewsDatas } from '../../store/slices/newsDataSlice'
import { useDispatch } from 'react-redux'


interface HomeProps {
  searchedValue: string | null;
}

const Home = ({ searchedValue }: HomeProps) => {
  const [newsData, setNewsData] = useState<Array<Article> | null>(null);
  const [filteredNewsData, setFilteredNewsData] = useState<Array<Article> | null>(newsData);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [selectedSources, setSelectedSources] = useState<string>('Select');
  const [age, setAge] = React.useState('');
  const newsDataSlice = useAppSelector(state => state.newsDataSlice)
  const dispatch = useDispatch()
  

  console.log("newsDataSlicenewsDataSlicenewsDataSlicenewsDataSlicenewsDataSlice", newsDataSlice);
  // URLs for different APIs
  const NEWSAPI_URL = process.env.REACT_APP_NEWSAPI_URL?.replace(
    '%SEARCH_VALUE%',
    searchedValue || ''
  )?.replace('%NEWSAPI_API_KEY%', process.env.REACT_APP_NEWSAPI_API_KEY || '');

  const NEWYORK_TIMES_API_URL = process.env.REACT_APP_NEWYORK_TIMES_API_URL?.replace(
    '%SEARCH_VALUE%',
    searchedValue || ''
  )?.replace('%NEWYORK_TIMES_API_KEY%', process.env.REACT_APP_NEWYORK_TIMES_API_KEY || '');

  const THE_GUARDIAN_API_URL = process.env.REACT_APP_THE_GUARDIAN_API_URL?.replace(
    '%SEARCH_VALUE%',
    searchedValue || ''
  )?.replace('%THE_GUARDIAN_API_KEY%', process.env.REACT_APP_THE_GUARDIAN_API_KEY || '');

  useEffect(() => {
    const fetchNewsData = async () => {
      setNewsData(null);
      try {
        let newsApiArticles: Article[] = [];
        let guardianApiArticles: Article[] = [];
        let newYorkTimesApiArticles: Article[] = [];
  
        // Fetch news data from News API
        if (NEWSAPI_URL) {
          const newsApiResponse = await fetch(NEWSAPI_URL);
          if (newsApiResponse.ok) {
            const newsApiData = await newsApiResponse.json();
            if (newsApiData.status === 'ok') {
              newsApiArticles = newsApiData.articles
                .filter((article: any) => article.author !== null && article.author !== undefined)
                .map((article: any) => ({
                  source: {
                    id: article.source.id,
                    name: article.source.name,
                  },
                  title: article.title,
                  description: article.description,
                  content: article.content,
                  publishedAt: article.publishedAt,
                  url: article.url,
                  urlToImage: article.urlToImage,
                }));
            }
          }
        }
  
        // Fetch news data from The Guardian API
        if (THE_GUARDIAN_API_URL) {
          const guardianApiResponse = await fetch(THE_GUARDIAN_API_URL);
          if (guardianApiResponse.ok) {
            const guardianApiData = await guardianApiResponse.json();
            guardianApiArticles = guardianApiData.response.results.map((article: any) => ({
              source: {
                id: 'the-guardian',
                name: 'The Guardian',
              },
              title: article.webTitle,
              description: article.sectionName,
              content: '', // The Guardian API does not provide content in the response
              publishedAt: article.webPublicationDate,
              url: article.webUrl,
              urlToImage: '',
            }));
          }
        }
  
        // Fetch news data from New York Times API
        if (NEWYORK_TIMES_API_URL) {
          const newYorkTimesApiResponse = await fetch(NEWYORK_TIMES_API_URL);
          if (newYorkTimesApiResponse.ok) {
            const newYorkTimesApiData = await newYorkTimesApiResponse.json();
            newYorkTimesApiArticles = newYorkTimesApiData.response.docs.map((article: any) => ({
              source: {
                id: 'the-new-york-times',
                name: 'The New York Times',
              },
              title: article.headline.main,
              description: article.snippet,
              content: article.abstract,
              publishedAt: article.pub_date,
              url: article.web_url,
              urlToImage: '',
            }));
            console.log("The New York Times NEWYORK_TIMES_API_URL", NEWYORK_TIMES_API_URL);
            console.log("The New York Times", newYorkTimesApiArticles);
          }
        }
  
        // Concatenate articles from all APIs and set the state
        const data: Array<Article> = [...newsApiArticles, ...guardianApiArticles, ...newYorkTimesApiArticles];
        setNewsData(data);
        setFilteredNewsData(data);
        // dispatch(loadNewsDatas(data));
      } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
      }
    };
  
    fetchNewsData();
  }, [searchedValue, NEWSAPI_URL, THE_GUARDIAN_API_URL, NEWYORK_TIMES_API_URL, dispatch]);

  const handleAuthorChange = (event: React.SyntheticEvent<Element, Event>, value: string[]) => {
    setSelectedAuthors(value);
  };

  const handleCategoryChange = (event: React.SyntheticEvent<Element, Event>, value: string[]) => {
    setSelectedCategories(value);
  };

  // const handleSourceChange = (event: React.SyntheticEvent<Element, Event>, value: string[]) => {
  //   setSelectedSources(value);
  // };

  const handleSourceChange = (event: SelectChangeEvent) => {
    setSelectedSources(event.target.value as string);
  };
  
  const handleFilters = () => {
    console.log("selectedSources", selectedSources);
    const filtered = newsData?.filter((news) => {
      return news.source.name === selectedSources;
    });
    console.log("filtered news are", filtered);
    setFilteredNewsData(filtered ?? null);
  };
  
  function formatSource(source: string): string {
    return source.replace(/-/g, ' ').replace(/\b\w/g, (char: string) => char.toUpperCase());
  }

  console.log("Start date", startDate);
  return (
    <>
      <Autocomplete
        sx={{ m: 1, width: 500 }}
        multiple
        options={CONSTANTS.AUTHORS}
        value={selectedAuthors}
        onChange={handleAuthorChange}
        getOptionLabel={(option) => option}
        disableCloseOnSelect
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label="Authors" placeholder="Select Authors" />
        )}
      />

      <Autocomplete
        sx={{ m: 1, width: 500 }}
        multiple
        options={CONSTANTS.AUTHORS}
        value={selectedCategories}
        onChange={handleCategoryChange}
        getOptionLabel={(option) => option}
        disableCloseOnSelect
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Categories"
            placeholder="Select Categories"
          />
        )}
      />

      <FormControl sx={{ m: 1, width: 500 }}>
        <InputLabel id="demo-simple-select-label">Source</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedSources} 
          label="Source"
          onChange={handleSourceChange}
        >
          {
    CONSTANTS.SOURCES.map((source) => (
      <MenuItem key={source} value={source}>{formatSource(source)}</MenuItem>
    ))
  }
        </Select>
      </FormControl>
      
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker', 'DatePicker']}>
          <DatePicker
            label="Controlled picker"
            value={startDate ? dayjs(startDate) : null}
            onChange={(newValue) => setStartDate(newValue)}
          />
        </DemoContainer>
      </LocalizationProvider>
      
      <Button onClick={handleFilters}>Filter</Button>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <NewsCard newsData={filteredNewsData} />
      </div>
    </>
  );
};

export default Home;

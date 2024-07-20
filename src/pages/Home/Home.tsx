import React, { useEffect, useState } from 'react';
import { CircularProgress, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Article } from '../../store/slices/newsDataSlice';
import { CONSTANTS } from '../../core/constants';
import {FilterComponent} from '../../Components/FilterComponent';
import { NewsCard } from '../../Components/Card';

interface HomeProps {
  searchedValue: string | null;
}

const Home: React.FC<HomeProps> = ({ searchedValue }) => {
  const newsDataFromStore: Article[] | null = useAppSelector((state) => state.newsDataSlice.newsData);
  const sourcesFromStore = useAppSelector((state) => state.newsDataSlice.sources);
  const [newsData, setNewsData] = useState<Article[] | null>(newsDataFromStore);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [filteredNewsData, setFilteredNewsData] = useState<Array<Article> | null>(null);

  const NEWSAPI_URL = process.env.REACT_APP_NEWSAPI_URL?.replace(
    '%SEARCH_VALUE%',
    searchedValue || ''
  )?.replace('%NEWSAPI_API_KEY%', process.env.REACT_APP_NEWSAPI_API_KEY || '')
  

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
      setLoading(true);
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
          }
        }

        const data: Array<Article> = [...newsApiArticles, ...guardianApiArticles, ...newYorkTimesApiArticles];
        setNewsData(data);
        setFilteredNewsData(data);
        setLoading(false);
      } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
        setLoading(false);
      }
    };

    fetchNewsData();
  }, [searchedValue, NEWSAPI_URL, THE_GUARDIAN_API_URL, NEWYORK_TIMES_API_URL, dispatch]);

  const handleFilter = (filteredData: Article[] | null) => {
    setNewsData(filteredData);
  };
  
  return (
    <>
      <FilterComponent
        authors={CONSTANTS.AUTHORS}
        sources={sourcesFromStore}
        newsData={newsDataFromStore}
        onFilter={handleFilter}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
          </div>
        ) : (
          <>
            {newsData && newsData.length > 0 ? (
              <NewsCard newsData={newsData} />
            ) : (
              <Typography variant="h6">No data to show.</Typography>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Home;

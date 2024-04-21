import React, { useState, useEffect } from 'react';
import { NewsCard } from '../../layouts/Card';
import { Article } from '../../layouts/Card/types';
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

  console.log("Start date", startDate);
  return (
    <>

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

import React, {useState, useEffect} from 'react';
import {NewsCard} from './components/Card'
import {Article} from './types'

interface HomeProps {
  searchedValue: string | null
}

const Home = ({searchedValue}: HomeProps) => {
  const [newsData, setNewsData] = useState<Array<Article> | null>(null);
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
      setNewsData(null)
      try {
        const newsApiResponse = NEWSAPI_URL ? await fetch(NEWSAPI_URL) : null;
        const guardianApiResponse = THE_GUARDIAN_API_URL ? await fetch(THE_GUARDIAN_API_URL) : null;
        const newYorkTimesApiResponse = NEWYORK_TIMES_API_URL ? await fetch(NEWYORK_TIMES_API_URL) : null;
        
        if (newsApiResponse && newsApiResponse.ok) {
          const newsApiData = await newsApiResponse.json();
          if (newsApiData.status === "ok") {
            // Map newsApiData to match Article interface
            const newsApiArticles = newsApiData.articles
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

            setNewsData((prevData: any) => [...(prevData || []), ...newsApiArticles]);
          }
        }
  
        if (guardianApiResponse && guardianApiResponse.ok) {
          const guardianApiData = await guardianApiResponse.json();
          const guardianApiArticles = guardianApiData.response.results.map((article: any) => ({
            source: {
              id: "the-guardian",
              name: "The Guardian"
            },
            title: article.webTitle,
            description: article.sectionName,
            content: "", // The Guardian API does not provide content in the response
            publishedAt: article.webPublicationDate,
            url: article.webUrl,
            urlToImage: ""
          }));
          setNewsData((prevData: any) => [...(prevData || []), ...guardianApiArticles]);
        }
  
        if (newYorkTimesApiResponse && newYorkTimesApiResponse.ok) {
          const newYorkTimesApiData = await newYorkTimesApiResponse.json();
          const newYorkTimesApiArticles = newYorkTimesApiData.response.docs.map((article: any) => ({
            source: {
              id: "the-new-york-times",
              name: "The New York Times"
            },
            title: article.headline.main,
            description: article.snippet,
            content: article.abstract,
            publishedAt: article.pub_date,
            url: article.web_url,
            urlToImage: ""
          }));
          setNewsData((prevData: any) => [...(prevData || []), ...newYorkTimesApiArticles]);
        }
      } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
      }
    };
  
    fetchNewsData();
  }, [searchedValue, NEWSAPI_URL, THE_GUARDIAN_API_URL, NEWYORK_TIMES_API_URL]);
  
    
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <NewsCard newsData={newsData} />
    </div>
  );
}

export default Home;

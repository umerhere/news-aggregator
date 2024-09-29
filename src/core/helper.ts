import axios from 'axios';
import { fetchArticlesNewsApiUrl } from "api/newsApi";
import { fetchGuardianArticlesAPI } from "api/theGuardianAPI";
import { fetchNewYorkTimesArticlesAPI  } from "api/newYorkTimesAPI";

export const fetchGuardianArticles = async (searchValue: string) => {
    try {
      const response = await axios.get(fetchGuardianArticlesAPI(searchValue));
      if (response.data.status !== 200) {
        throw new Error(`Error fetching Guardian articles: ${response.statusText}`);
      }
      console.log("*** guardian", await  response.data)
      return response.data.response.results
    } catch (error) {
      console.error('Error fetching Guardian articles:', error);
      return null;
    }
  };
  
  export const fetchNewYorkTimesArticles = async (searchValue: string) => {
    try {
      const response = await axios.get(fetchNewYorkTimesArticlesAPI(searchValue));
      if (response.data.status !== 'OK') {
        throw new Error(`Error fetching New York Times articles: ${response.statusText}`);
      }
      console.log("*** NY", await  response.data.response.docs)
      return response.data.response.docs;
    } catch (error) {
      console.error('Error fetching New York Times articles:', error);
      return null;
    }
  };
  
  export const fetchNewsApiArticles = async (searchValue: string) => {
    try {
      const response = await axios.get(fetchArticlesNewsApiUrl(searchValue));
      if (!response.data) {
        throw new Error(`Error fetching NewsAPI articles: ${response.statusText}`);
      }
      console.log("*** News API", await  response.data.articles)
      return await response.data.articles;
    } catch (error) {
      console.error('Error fetching NewsAPI articles:', error);
      return null;
    }
  };
  
  export const transformArticles = (articles: any[], source: string): Article[] => {
    return articles
      .map((article: any) => {
        switch (source) {
          case 'NewsAPI':
            return article.title && article.url ? {
              title: article.title,
              description: article.description || 'No description available',
              url: article.url,
              publishedAt: article.publishedAt || '',
              source: 'NewsAPI',
              category: article.sectionName || 'General',
            } : null;
  
          case 'The Guardian':
            return article.webTitle && article.webUrl ? {
              title: article.webTitle,
              description: article.sectionName || 'No description available',
              url: article.webUrl,
              publishedAt: article.webPublicationDate || '',
              source: 'The Guardian',
              category: article.sectionName || 'General',
            } : null;
  
          case 'New York Times':
            return article.headline?.main && article.web_url ? {
              title: article.headline.main,
              description: article.snippet || 'No description available',
              url: article.web_url,
              publishedAt: article.pub_date || '',
              source: 'New York Times',
              category: article.news_desk || 'General',
            } : null;
  
          default:
            return null;
        }
      })
      .filter((article: any): article is Article => article !== null); // Filters out null values
  };
  
// src/api/api.ts

import axios from 'axios';
import {
CONSTANTS
} from 'core/constants';

const NEWSAPI_KEY = process.env.REACT_APP_NEWSAPI_KEY;
const NYTIMES_KEY = process.env.REACT_APP_NYTIMES_KEY;
const GUARDIAN_KEY = process.env.REACT_APP_GUARDIAN_KEY;

export const fetchData = async (searchTerm: string | null, selectedDate: string | null, selectedSource: string): Promise<Article[]> => {
  try {
    const query = searchTerm?.trim() || 'news';

    let newsApiURL = `${CONSTANTS.NEWSAPI_URL}${query}&apiKey=${NEWSAPI_KEY}`;
    let nyTimesURL = `${CONSTANTS.NYTIMES_URL}${query}&api-key=${NYTIMES_KEY}`;
    let guardianURL = `${CONSTANTS.GUARDIAN_URL}${query}&api-key=${GUARDIAN_KEY}`;

    if (selectedDate) {
      newsApiURL += `&from=${selectedDate}&to=${selectedDate}`;
      nyTimesURL += `&begin_date=${selectedDate.replace(/-/g, '')}&end_date=${selectedDate.replace(/-/g, '')}`;
      guardianURL += `&from-date=${selectedDate}&to-date=${selectedDate}`;
    }

    const [newsApiResponse, nyTimesResponse, guardianResponse] = await Promise.all([
      axios.get(newsApiURL),
      axios.get(nyTimesURL),
      axios.get(guardianURL),
    ]);

    const newsApiArticles = newsApiResponse.data.articles.map((article: any) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      source: 'NewsAPI',
      publishedAt: article.publishedAt,
      category: article.category || 'general',
    }));

    const nyTimesArticles = nyTimesResponse.data.response.docs.map((article: any) => ({
      title: article.headline.main,
      description: article.snippet,
      url: article.web_url,
      source: 'NYTimes',
      publishedAt: article.pub_date,
      category: article.section_name || 'general',
    }));

    const guardianArticles = guardianResponse.data.response.results.map((article: any) => ({
      title: article.webTitle,
      description: article.sectionName,
      url: article.webUrl,
      source: 'The Guardian',
      publishedAt: article.webPublicationDate,
      category: article.sectionName,
    }));

    let allArticles = [...newsApiArticles, ...nyTimesArticles, ...guardianArticles];

    if (selectedSource !== 'All') {
      allArticles = allArticles.filter((article) => article.source === selectedSource);
    }

    return allArticles;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch data from APIs');
  }
};

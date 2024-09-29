import { NEWS_API_BASE_URL, NEWS_API_TOP_HEADLINES_URL, NEWS_API_KEY } from 'core/constants';

// fetch articles API URL based on search value
export const fetchArticlesNewsApiUrl = (searchValue: string) => {
  return NEWS_API_BASE_URL.replace('%SEARCH_VALUE%', searchValue).replace('%NEWSAPI_API_KEY%', NEWS_API_KEY);
};

// fetch top headlines API URL based on search value and category
export const fetchHeadlinesNewsApi = (searchValue: string, category: string) => {
  return NEWS_API_TOP_HEADLINES_URL
    .replace('%SEARCH_VALUE%', searchValue)
    .replace('%SEARCH_CATEGORY_VALUE%', category)
    .replace('%NEWSAPI_API_KEY%', NEWS_API_KEY);
    
};

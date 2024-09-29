import { NEWYORK_TIMES_API_URL, NEWYORK_TIMES_API_KEY } from 'core/constants';

// Function to fetch articles from New York Times
export const fetchNewYorkTimesArticlesAPI = (searchValue: string) => {
  return NEWYORK_TIMES_API_URL.replace('%SEARCH_VALUE%', searchValue).replace('%NEWYORK_TIMES_API_KEY%', NEWYORK_TIMES_API_KEY);
};

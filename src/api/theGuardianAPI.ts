import { THE_GUARDIAN_API_URL, THE_GUARDIAN_API_KEY } from 'core/constants';

// API URL to fetch articles from The Guardian
export const fetchGuardianArticlesAPI = (searchValue: string) => {
  return THE_GUARDIAN_API_URL.replace('%SEARCH_VALUE%', searchValue).replace('%THE_GUARDIAN_API_KEY%', THE_GUARDIAN_API_KEY);
};

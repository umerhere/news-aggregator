import axios from 'axios';

// Helper function to handle retry with exponential backoff
export const fetchDataWithRetry = async (url: string, retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 429 && i < retries - 1) {
        // If status is 429 (rate limit), wait and retry (exponential backoff)
        await new Promise((resolve) => setTimeout(resolve, delay * Math.pow(2, i)));
      } else {
        throw error;
      }
    }
  }
};

// import axios from 'axios';
// import { fetchArticlesNewsApiUrl } from "api/newsApi";
// import { fetchGuardianArticlesAPI } from "api/theGuardianAPI";
// import { fetchNewYorkTimesArticlesAPI  } from "api/newYorkTimesAPI";


// // Fetch articles from Guardian with pagination
// export const fetchGuardianArticles = async (searchValue: string, page: number) => {
//   try {
//     const response = await axios.get(fetchGuardianArticlesAPI(searchValue, page));
//     if (response.status !== 200) {
//       throw new Error(`Error fetching Guardian articles: ${response.statusText}`);
//     }
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching Guardian articles:', error);
//     throw error;
//   }
// };

// // Fetch articles from New York Times with pagination
// export const fetchNewYorkTimesArticles = async (searchValue: string, page: number) => {
//   try {
//     const response = await axios.get(fetchNewYorkTimesArticlesAPI(searchValue, page));
//     if (response.data.status !== 'OK') {
//       throw new Error(`Error fetching New York Times articles: ${response.statusText}`);
//     }
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching New York Times articles:', error);
//     throw error;
//   }
// };

// // Fetch articles from NewsAPI with pagination
// export const fetchNewsApiArticles = async (searchValue: string, page: number) => {
//   try {
//     const response = await axios.get(fetchArticlesNewsApiUrl(searchValue, page));
//     if (!response.data) {
//       throw new Error(`Error fetching NewsAPI articles: ${response.statusText}`);
//     }
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching NewsAPI articles:', error);
//     throw error;
//   }
// };

// /**
//  * Transform articles into a consistent structure across different sources
//  * @param articles - Array of articles from a specific source
//  * @param source - Name of the source (e.g., 'The Guardian', 'New York Times', 'NewsAPI')
//  * @returns Array of articles transformed into a common structure
//  */
// export const transformArticles = (articles: any[], source: string): Article[] => {
//   return articles
//     .map((article: any) => {
//       switch (source) {
//         case 'NewsAPI':
//           return article.title && article.url ? {
//             title: article.title,
//             description: article.description || 'No description available',
//             url: article.url,
//             publishedAt: article.publishedAt || '',
//             source: 'NewsAPI',
//             category: article.sectionName || 'General',
//           } : null;

//         case 'The Guardian':
//           return article.webTitle && article.webUrl ? {
//             title: article.webTitle,
//             description: article.sectionName || 'No description available',
//             url: article.webUrl,
//             publishedAt: article.webPublicationDate || '',
//             source: 'The Guardian',
//             category: article.sectionName || 'General',
//           } : null;

//         case 'New York Times':
//           return article.headline?.main && article.web_url ? {
//             title: article.headline.main,
//             description: article.snippet || 'No description available',
//             url: article.web_url,
//             publishedAt: article.pub_date || '',
//             source: 'New York Times',
//             category: article.news_desk || 'General',
//           } : null;

//         default:
//           return null;
//       }
//     })
//     .filter((article: any): article is Article => article !== null); // Filters out null values
// };

export {}
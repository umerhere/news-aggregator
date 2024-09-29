import { useEffect, useState } from 'react';
import { fetchGuardianArticles, fetchNewYorkTimesArticles, fetchNewsApiArticles, transformArticles } from 'core/helper';

interface Article {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: string;
  category: string;
}

const Home = () => {
  const [newsData, setNewsData] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>('latest'); // Default value or user-input

  useEffect(() => {
    const fetchAllNews = async () => {
      try {
        setLoading(true);

        console.log(searchValue)
        const guardianResponse = await fetchGuardianArticles(searchValue);
        const newYorkTimesResponse = await fetchNewYorkTimesArticles(searchValue);
        const newsApiResponse = await fetchNewsApiArticles(searchValue);

        console.log('Guardian Response:', guardianResponse);
        console.log('New York Times Response:', newYorkTimesResponse);
        console.log('NewsAPI Response:', newsApiResponse);

        // Extracting results from responses
        const guardianArticles = guardianResponse?.response?.results || [];
        const newYorkTimesArticles = newYorkTimesResponse?.response?.docs || [];
        const newsApiArticles = newsApiResponse?.articles || [];

        // Transform the articles into a uniform structure
        const transformedGuardianArticles = transformArticles(guardianArticles, 'The Guardian');
        const transformedNyTimesArticles = transformArticles(newYorkTimesArticles, 'New York Times');
        const transformedNewsApiArticles = transformArticles(newsApiArticles, 'NewsAPI');

        // Merge the articles from different sources
        setNewsData([...transformedGuardianArticles, ...transformedNyTimesArticles, ...transformedNewsApiArticles]);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllNews();
  }, [searchValue]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <input 
        type="text" 
        value={searchValue} 
        onChange={(e) => setSearchValue(e.target.value)} 
        placeholder="Search articles"
      />
      {newsData.map((article, index) => (
        <div key={index}>
          <h3>{article.title}</h3>
          <p>{article.description}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
        </div>
      ))}
    </div>
  );
};

export default Home;

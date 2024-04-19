import React, {useState, useEffect} from 'react';
import {NewsCard} from './components/Card'
import {Article} from './types'
  
const Home = () => {
  const [newsData, setNewsData] = useState<Array<Article> | null>(null);
  useEffect(() => {
    fetch('https://newsapi.org/v2/everything?q=Apple&from=2024-04-17&sortBy=popularity&apiKey=c5cabfab64df4ce689ede47f32c14d6b')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Assuming the response is JSON
    })
    .then(data => {
      // Work with the fetched data
      console.log(data.articles);
      if (data.status === "ok") {
        setNewsData(data.articles)
      }
    })
    .catch(error => {
      console.error('There was a problem with your fetch operation:', error);
    });
  }, [])  
    
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <NewsCard newsData={newsData} />
    </div>
  );
}

export default Home;

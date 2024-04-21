import React, { useEffect, useState } from 'react';
import { CircularProgress, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Article } from '../../store/slices/newsDataSlice';
import { CONSTANTS } from '../../core/constants';
import {FilterComponent} from '../../Components/FilterComponent';
import { NewsCard } from '../../Components/Card';

interface HomeProps {
  searchedValue: string | null;
}

const Home: React.FC<HomeProps> = ({ searchedValue }) => {
  const newsDataFromStore: Article[] | null = useAppSelector((state) => state.newsDataSlice.newsData);
  const sourcesFromStore = useAppSelector((state) => state.newsDataSlice.sources);
  const [newsData, setNewsData] = useState<Article[] | null>(newsDataFromStore);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchNewsData = async () => {
      setLoading(true);
      try {
        // Your API fetching logic
      } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsData();
  }, [searchedValue, dispatch]);

  const handleFilter = (filteredData: Article[] | null) => {
    setNewsData(filteredData);
  };

  return (
    <>
      <FilterComponent
        authors={CONSTANTS.AUTHORS}
        sources={sourcesFromStore}
        newsData={newsDataFromStore}
        onFilter={handleFilter}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
          </div>
        ) : (
          <>
            {newsData && newsData.length > 0 ? (
              <NewsCard newsData={newsData} />
            ) : (
              <Typography variant="h6">No data to show.</Typography>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Home;

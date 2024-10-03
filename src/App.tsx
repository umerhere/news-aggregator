import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { ForYou } from './pages/ForYou';
import { Settings } from './pages/Settings';
import NavBar from './components/layout/NavBar';
import Layout from 'components/layout/MainLayout';

const App: React.FC = () => {
  return (
    <Router>
      <NavBar />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/for-you" element={<ForYou />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;

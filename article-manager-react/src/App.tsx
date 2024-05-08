import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ArticleList from './components/ArticleList';
import ArticleDetails from './components/ArticleDetails/ArticleDetails';
import AddArticle from './components/AddArticle/AddArticle';
import EditArticle from './components/EditArticle/EditArticle';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={ArticleList} />
        <Route path="/articles/:id" Component={ArticleDetails} />
        <Route path="/articles/add" Component={AddArticle} />
        <Route path="/articles/edit/:id" Component={EditArticle} />
      </Routes>
    </Router>
  );
};

export default App;

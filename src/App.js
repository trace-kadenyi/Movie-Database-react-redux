import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Movies from './Components/Movies/Movies';
import Header from './Components/Header/Header';
import Comments from './Components/Comments/Comments';

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Movies />} />
      <Route path="comments/:id" element={<Comments />} />
    </Routes>
  </Router>
);

export default App;

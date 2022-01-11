import React from 'react';

// components
import Search from './components/search/Search.js';
import Header from './components/header/Header';
import ResultList from './components/result-list/ResultList.js';

function App() {
  return (
    <div className='container'>
      <Header />
      <Search />
      <ResultList />
    </div>
  );
}

export default App;

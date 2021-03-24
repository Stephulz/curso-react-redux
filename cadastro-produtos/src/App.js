import React from 'react';
import { HashRouter } from 'react-router-dom';

import Navbar from './components/navbar'
import Rotas from './rotas';

function App() {
  return (
    <>
      <div className="container">
        <HashRouter>
          <Navbar />
          <Rotas />
        </HashRouter>
      </div>
    </>
  );
}

export default App;

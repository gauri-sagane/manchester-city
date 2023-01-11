import React from 'react';
import ReactDOM from 'react-dom/client';
import Routes from './RoutesMain';
import '../src/Resources/css/app.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>
);

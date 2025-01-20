import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client' instead
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // Create root for rendering
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

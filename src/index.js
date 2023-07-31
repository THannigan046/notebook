import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {ThemeContext} from './context/ThemeContext';

import store from './redux/store';

import App from './components/App/App';

const root = ReactDOM.createRoot(document.getElementById('react-root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeContext> 
        <App />
      </ThemeContext>
    </Provider>
  </React.StrictMode>
);

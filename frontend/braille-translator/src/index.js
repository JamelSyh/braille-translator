import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { reducers } from "./redux/reducers";
import { createStore } from "redux";
import { Provider } from 'react-redux';

export const store = createStore(
  reducers
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

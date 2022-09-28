import React from 'react';
import ReactDOM from 'react-dom/client';
import Firebaseconfig from './Firebaseconfig';
import store from './store'
import { Provider } from 'react-redux'
import './style.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Provider store={store}>
  <App />
</Provider>
);


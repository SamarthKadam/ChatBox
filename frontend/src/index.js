import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import store from './services/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
    <App />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


///https://i.ibb.co/WHQPSRX/7309700.jpg women1
//https://i.ibb.co/LQvJbv1/27470334-7309681.jpg men 1
//https://i.ibb.co/KrCfzc3/27470336-7294793.jpg women 2
//https://i.ibb.co/GF5K0Zx/9439678.jpg men 2
//https://i.ibb.co/4fSJHhf/27470349-7309670.jpg women 3
//https://i.ibb.co/d2qRfFh/9434619.jpg men 3
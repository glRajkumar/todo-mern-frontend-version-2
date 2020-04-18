import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import AuthContextProvider from './Contexts/AuthContextProvider';

ReactDOM.render(
    <BrowserRouter>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </BrowserRouter>,
     document.getElementById('root')
);
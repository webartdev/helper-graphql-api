import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ReactQueryProvider from "./config/ReactQuery"

import Amplify from "aws-amplify";

import aws_exports from "./aws-exports";

Amplify.configure(aws_exports);

ReactDOM.render(
  <ReactQueryProvider>
    <App />
  </ReactQueryProvider>,
  document.getElementById('root')
);

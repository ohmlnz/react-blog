import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';

// Import components
import Article from './components/Article';
import App from './App';


const BlogRouter = () => (
  <Router>
  	<div>
	    <Route exact path="/" component={App} />
	    <Route path="/article/:articleId" component={Article} />
  	</div>
  </Router>
);

ReactDOM.render(
  <BlogRouter />,
  document.getElementById('root')
);

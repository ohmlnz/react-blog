import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';

// Import components
import Article from './components/Article';
import App from './App';

// Redux stuff
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { fetchArticles } from './actions/actionCreators'

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux'
import { rootReducer } from './reducers/index';

const loggerMiddleware = createLogger();
	
const defaultState = {
	blogState: {
		articles: []
	},
	selection: null
}
let middleware = applyMiddleware(thunkMiddleware, loggerMiddleware);

let store = createStore(
	rootReducer,
	defaultState,
	compose(
		middleware,
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	) 
);

store
   .dispatch(fetchArticles(0))
console.log(store.getState())

const BlogRouter = () => (
  <Provider store={store}>
	  <Router>
	  	<div>	
		    <Route exact path="/" component={App} />
		    <Route path="/article/:articleId" component={Article} />
	  	</div>
	  </Router>
	</Provider>
);

ReactDOM.render(
  <BlogRouter />,
  document.getElementById('root')
);

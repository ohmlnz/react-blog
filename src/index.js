import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import { EditorState } from 'draft-js';

// Import components
import App from './App';
import Single from './containers/Single';
import LoginBlog from './containers/LoginBlog';
import NotFound from './components/NotFound';

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
		articles: [],
		user: '',
		userAva: '',
		userProfile: '',
		addArticle: '',
		editMode: false,
		animation: false
	},
	editor: {
		editorState: EditorState.createEmpty(),
		toolbar: []
	}
}
let middleware = applyMiddleware(thunkMiddleware, loggerMiddleware);

let store = createStore(
	rootReducer,
	defaultState,
	compose(
		middleware,
		//window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

store
   .dispatch(fetchArticles(0))
console.log(store.getState())

const BlogRouter = () => (
  <Provider store={store}>
	  <Router>
	  	<Switch>
		    <Route exact path="/" component={App} />
		    <Route path="/article/:articleId" component={Single} />
				<Route path="/admin" component={LoginBlog} />
				<Route path="*" component={NotFound}/>
	  	</Switch>
	  </Router>
	</Provider>
);

ReactDOM.render(
  <BlogRouter />,
  document.getElementById('root')
);

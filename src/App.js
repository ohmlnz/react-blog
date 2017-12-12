import React from 'react';
import LoadArticles from './containers/LoadArticles';
import EditMode from './containers/EditMode';
import LoginBlog from './containers/LoginBlog';
import './App.css';

const App = () => (
	<div>
		<LoginBlog />
		<LoadArticles />
		<EditMode />
	</div>
)

export default App;
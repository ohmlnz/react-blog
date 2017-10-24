import React from 'react';
import LoadArticles from './containers/LoadArticles';
import EditMode from './containers/EditMode';
import './App.css';

const App = () => (
	<div>
		<EditMode />
		<LoadArticles />
	</div>
)

export default App;
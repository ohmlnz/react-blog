import React from 'react';
import '../css/Article.css';

const Article = ({blogState, match}) => (
 <div>
	{blogState.articles.filter(el =>
		el.id == match.params.articleId 
	).map(a => 
		<div className='single-article' key={a.id}>
			<h2>{a.title}</h2>
			<p>{a.content}</p>
		</div>
	)}
 </div>
)

export default Article;
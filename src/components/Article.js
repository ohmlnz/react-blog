import React from 'react';
import '../css/Article.css';

const Article = ({blogState, match}) => (
 <div>
	{blogState.articles.filter(el =>
		el.id.toString() === match.params.articleId 
	).map(a => 
		<div className='single-article' key={a.id}>
			<h2>{a.title}</h2>
			<span dangerouslySetInnerHTML={{__html: a.content}} />
		</div>
	)}
 </div>
)

export default Article;
import React from 'react';
import { Pager } from 'react-bootstrap';
import '../css/Article.css';

const Article = ({blogState, match}) => (
 <div>
	{blogState.articles.filter(el =>
		el.id.toString() === match.params.articleId 
	).map(a => 
		<div className='single-article' key={a.id}>
			<h2>{a.title}</h2>
			<div className='single-body'>
				<span dangerouslySetInnerHTML={{__html: a.content + '<hr>'}}/>
			</div>
		</div>
	)}
	<Pager className='article-previous'>
 		<Pager.Item previous href='/'>&larr; Previous</Pager.Item>
	</Pager>
 </div>
)

export default Article;
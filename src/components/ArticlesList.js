import React from 'react';
import { Panel } from 'react-bootstrap';
import { Pagination } from '../components/Pagination' 
import '../css/ArticlesList.css'

export const ArticlesList = (props) => (
	<div>{props.articles.map(a => 
		<Panel header={a.title} key={a.id}>
			<span dangerouslySetInnerHTML={{__html: a.content}} />
		</Panel>)}
		<Pagination/>
	</div>
)

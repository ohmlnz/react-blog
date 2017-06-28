import React from 'react';
import { Panel } from 'react-bootstrap';

import { Pagination } from '../components/Pagination' 
import '../css/ArticlesList.css'
import PropTypes from 'prop-types';

export const ArticlesList = (props) => (
	<div>{props.articles.map(a => 
		<Panel header={a.title} key={a.id}>
			<i className="fa fa-trash-o" aria-hidden="true" style={{display: props.removeState}} onClick={props.removeArticle} id={a.id}></i>
			<span dangerouslySetInnerHTML={{__html: a.content}} />
		</Panel>)}
		<Pagination/>
	</div>
)

ArticlesList.propTypes = {
  articles: PropTypes.array
};
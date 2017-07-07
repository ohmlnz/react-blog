import React from 'react';
import { Panel } from 'react-bootstrap';
import Moment from 'react-moment';

import { Pagination } from '../components/Pagination'
import { CommentSection } from '../components/CommentSection'
import { CommentsList } from '../components/CommentsList' 
import '../css/ArticlesList.css'
import PropTypes from 'prop-types';


export const ArticlesList = (props) => (
	<div>{props.articles.map(a => 
		<div key={a.id}>
			<Panel header={a.title}>
				<i className="fa fa-trash-o" aria-hidden="true" style={{display: props.removeState}} onClick={props.removeArticle} id={a.id}></i>
				<span dangerouslySetInnerHTML={{__html: a.content}} />
				<hr/>
				<span className='timestamp'>Posted <Moment fromNow>{a.timestamp}</Moment>.</span>
				<span className='comments' onClick={() => props.revealComments(a.id, a.showComments)}>{a.comments? `There are ${a.comments.length} comments.` : 'There are no comments yet.'}</span>
			</Panel>
			{a.comments? <CommentsList comments={a.comments} /> : ''}
			<CommentSection showComments={a.showComments} newComments={props.newComments} commentChange={props.commentChange} ArticleIndex={a.id} commentId={a.comments} />
		</div>)}
		<Pagination />
	</div>
)

ArticlesList.propTypes = {
  articles: PropTypes.array,
  revealComments: PropTypes.func
};
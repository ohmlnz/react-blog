import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

import '../css/CommentsList.css'

export const CommentsList = (props) => (
	<div style={{marginTop: '2em'}}>{props.comments.map(a => 
		<div className='comment-wrapper' style={{display: `${props.showComments}`}} key={a.id}>
			<div className='comments-list'>
				<div className='user-avatar'><a href={a.profile} target="_blank"><img src={a.avatar} alt='user avatar'/></a></div>
				<div className='user-comment'>{a.content}</div>
				<div className='comment-timestamp'><Moment fromNow>{a.timestamp}</Moment></div>
			</div>
			<hr/>
		</div>)}
	</div>
)

CommentsList.propTypes = {
  articles: PropTypes.array
};
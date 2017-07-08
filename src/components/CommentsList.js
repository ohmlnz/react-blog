import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

import '../css/CommentsList.css'

export const CommentsList = (props) => (
	<div>{props.comments.map(a => 
		<div style={{display: `${props.showComments}`}}>
			<div className='comments-list' key={a.id}>
				<div className='user-avatar'><img src={a.avatar} alt='user avatar'/></div>
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
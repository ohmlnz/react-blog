import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Pager } from 'react-bootstrap';
import Editor from 'draft-js-plugins-editor';
import { EditorState, ContentState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import isEqual from 'lodash/isEqual';
import Moment from 'react-moment';

//import { CommentSection } from './CommentSection';
import '../css/Article.css';

class Article extends Component {

	state = {
		editorState: EditorState.createEmpty(),
		editMode: 'block'
	}

	componentDidMount = () => {
		if (this.props.blogState.hasOwnProperty('content') && this.props.blogState.content.id.toString() === this.props.match.params.articleId) {
			this.setState({
				editorState: EditorState.createWithContent(ContentState.createFromText(this.props.blogState.content.body)),
				editMode: 'none'
			})
		}
	}

	editBody = (editorState) => {
		this.setState({ editorState })
	}

	saveEdits = (e) => {
    e.preventDefault()

    // Ensure that the article isn't empty (has either text or media)
    if (isEqual(stateToHTML(this.state.editorState.getCurrentContent()), '<p><br></p>')) {
      return;
    }

    const index = this.props.blogState.content.id-1;
    const content = this.state.editorState.getCurrentContent().getPlainText();
    const timestamp = Date.now();

    this.props.updateArticle(index, content, timestamp)
	}

	render() {
		const edit = this.state.editMode === 'block'? 'none' : 'block';
		const regular = this.state.editMode === 'block'? 'block' : 'none';
		const lastEdit = this.props.blogState.hasOwnProperty('content')? this.props.blogState.content.lastEdit: '';

		return (
		 <div>
			{this.props.blogState.articles.filter(el =>
				el.id.toString() === this.props.match.params.articleId
			).map(a =>
				<div className='single-article' key={a.id}>
					<h2>{a.title}</h2>
					<p>Last updated:  <Moment fromNow>{lastEdit || a.lastEdit}</Moment>.</p>
					<div className='single-body' style={{display: `${regular}`}}>
						<span dangerouslySetInnerHTML={{__html: a.content + '<hr>'}}/>
					</div>
		      <div className='single-body-edit' style={{display: `${edit}`}}>
						<div className='single-body-edit-textarea'>
							<Editor
				        editorState={this.state.editorState}
				        spellCheck={true}
				        placeholder='Share your thoughts...'
				        onChange={this.editBody}
				      />
				    </div>
				    <div className='save-edits' onClick={this.saveEdits}>Save</div>
		      </div>
		      <div className='single-comments' >
						<h4>Comments ({a.comments})</h4>
						<p>{a.comments > 0? a.comments : 'There aren\'t any comments at the moment.'}</p>
					</div>
				</div>
			)}
			<Pager className='article-previous'>
		 		<Pager.Item previous href='/'>&larr; Previous</Pager.Item>
			</Pager>
		 </div>
		)
	}
}

Article.propTypes = {
  blogState: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

export default Article;

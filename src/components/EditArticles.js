import React, { Component } from 'react';
import { Col, Form, FormGroup, FormControl, Button, PageHeader } from 'react-bootstrap';
import { Editor, EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import startsWith from 'lodash/startsWith';
// import orderBy from 'lodash/orderBy';
import { toInline, toBlock } from '../helpers/toolbar';

import buttons from '../data/buttons.json';
import '../css/ArticleForm.css';
import '../css/EditArticles.css';


class EditArticles extends Component {
	state = {
		title: '',
		editorState: EditorState.createEmpty(),
		toolbar: []
	}

	changeBody = (editorState) => {
		this.setState({
      editorState,
      toolbar: []
    })

    const styles = editorState.getCurrentInlineStyle()._map._list._tail
    const startKey = editorState.getSelection().getStartKey();
    const selectedBlockType = editorState
    .getCurrentContent()
    .getBlockForKey(startKey)
    .getType()
  

    if ((selectedBlockType !== 'unstyled') && styles) {
      const newInline = styles.array.map(a => a !== undefined? [a[0], a[1]].join(',') : null) 
      const newBlock = [selectedBlockType + ',true']
      const total = newBlock.concat(newInline)   
      this.setState({ toolbar: total })  
      return
    }

    if (styles) {
      const newInline = styles.array.map(a => a !== undefined? [a[0], a[1]].join(',') : null) 
      this.setState({ toolbar: newInline })  
    }

    if (selectedBlockType !== 'unstyled') {
      const newBlock = [selectedBlockType + ',true']
      this.setState({ toolbar: newBlock })
    }
	}

	changeTitle = (e) => {
		this.setState({
      title: e.target.value,
      toolbar: []
    })
	}

	submitArticle = (e) => {
    e.preventDefault()

    // Ensure that the article isn't empty
    if ((!this.state.title.length) || (startsWith(stateToHTML(this.state.editorState.getCurrentContent()), '<p><br></p>'))) {
      return
    }

    const id = this.props.blogState.lastId || 0
    const title = this.state.title
    const content = stateToHTML(this.state.editorState.getCurrentContent())
    const timestamp = Date.now()
    const comments = 0
    const showComments = 'none'
    // const article = { "id": id, "title": title, "content": content, "timestamp": timestamp, "comments": comments, "showComments": showComments }
    // const articles = this.props.blogState.articles.concat(article)
    // Push changes to DB
    this.props.addArticle(id, id+1, title, content, timestamp, comments, showComments)

    // Reset local state
    this.setState({
      title: '',
      editorState: EditorState.createEmpty(),
      toolbar: []
    });
  }

	render() {
		return (
			<div>
			  <div className='edit-mode'>
			    <span onClick={() => this.props.changeMode(this.props.editor.editMode)}>Edit Mode</span>
			  </div>

			  <div className='editor-wrapper' style={{display: this.props.editor.editMode? 'block' : 'none'}}>
				  <div id='add-article'>
				    <PageHeader>
				    	<small>Add a new entry</small>
				    </PageHeader>

				    {buttons.block.map((b, index) =>
				      <Button 
				        key={index}
				        bsClass='btn-custom' 
				        active={this.state.toolbar.indexOf(`${b.id},true`) !== -1? true: false}
				        onClick={() => this.changeBody(toBlock(this.state.editorState, b.id))}>{b.label}
				      </Button> 
				    )}

				    {buttons.inline.map((b, index) =>
				      <Button 
				        key={index}
				        bsClass='btn-custom' 
				        active={this.state.toolbar.indexOf(`${b.id},true`) !== -1? true: false}
				        onClick={() => this.changeBody(toInline(this.state.editorState, b.id))}>{b.label}
				      </Button> 
				    )}
				  </div>

				  <Form horizontal onSubmit={this.submitArticle}>
				   <FormGroup controlId="formBasicText">
				    <Col sm={12}>
				    	<FormControl type="text" placeholder="Give a title to your article..." onChange={this.changeTitle} value={this.state.title} />
				    </Col>
				   </FormGroup>

				   <FormGroup controlId="formControlsTextarea">
				   	<Col sm={12}>
				      <div className='form-control' style={{minHeight:'150px', resize: 'vertical', overflow: 'scroll'}}>
								<Editor 
				          editorState={this.state.editorState} 
				          onChange={this.changeBody}
				          spellCheck={true}
				          placeholder='Share your thoughts...'
				        />
				      </div>
				    </Col>
				   </FormGroup>

				    <FormGroup>
				      <Col sm={12}>
				        <Button type="submit" block={true}>
				          Submit
				        </Button>
				      </Col>
				    </FormGroup>
				  </Form>
				 </div>
			</div>
		)
	}
}

export default EditArticles;

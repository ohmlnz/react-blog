import React, { Component } from 'react';
import { Col, Form, FormGroup, FormControl, Button, PageHeader } from 'react-bootstrap';
import { Editor, EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import startsWith from 'lodash/startsWith';
import orderBy from 'lodash/orderBy';

import buttons from '../data/buttons.json';
import '../css/ArticleForm.css';
import '../css/EditArticles.css';


class EditArticles extends Component {
	state = {
		title: '',
		editorState: EditorState.createEmpty(),
		toolbar: []
	}

	changeTitle = (e) => {
		this.setState({
      title: e.target.value,
      toolbar: []
    })
	}

	submitArticle = (e) => {
    e.preventDefault()

    // // Ensure that the article isn't empty
    // if ((!this.state.title.length) || (startsWith(stateToHTML(this.state.editorState.getCurrentContent()), '<p><br></p>'))) {
    //   return
    // }

    const id = this.props.blogState.total+1
    const title = this.state.title
    //const content = stateToHTML(this.state.editorState.getCurrentContent())
    const content = 'lol'
    const timestamp = Date.now()
    const comments = 0
    const showComments = 'none'
    const article = { "id": id, "title": title, "content": content, "timestamp": timestamp, "comments": comments, "showComments": showComments }
    const articles = this.props.blogState.articles.concat(article)
    // Push changes to DB
    this.props.addArticle(id-1, id, title, content, timestamp, comments, showComments)

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
				        /*active={this.state.toolbar.indexOf(`${b.id},true`) !== -1? true: false}*/
				        /*onClick={() => this.onChange(toBlock(this.state.editorState, b.id))}*/>{b.label}
				      </Button> 
				    )}

				    {buttons.inline.map((b, index) =>
				      <Button 
				        key={index}
				        bsClass='btn-custom' 
				        /*active={this.state.toolbar.indexOf(`${b.id},true`) !== -1? true: false}*/ 
				        /*onClick={() => this.onChange(toInline(this.state.editorState, b.id))}*/>{b.label}
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
								{/*<Editor 
				          //editorState={editor.editorState} 
				          // onChange={}
				          spellCheck={true}
				          placeholder='Share your thoughts...'
				        />*/}
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

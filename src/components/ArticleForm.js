import React from 'react';
import { Col, Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import '../css/ArticleForm.css';
import { Editor } from 'draft-js';

export const ArticleForm = (props) => (
<Form horizontal onSubmit={props.submit}>
  
 <FormGroup controlId="formBasicText">
  <Col sm={12}>
  	<FormControl type="text" placeholder="Title of the article" onChange={props.titleChange} value={props.title} />
  </Col>
 </FormGroup>

 <FormGroup controlId="formControlsTextarea">
 	<Col sm={12}>
    <div className='form-control' style={{minHeight:'150px', resize: 'vertical', overflow: 'scroll'}}>
      <Editor 
        editorState={props.editor} 
        onChange={props.editorChange} 
        spellCheck={true}
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
)
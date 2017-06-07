import React from 'react';
import { Col, Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import '../css/ArticleForm.css';
import { Editor } from 'draft-js';
import PropTypes from 'prop-types';

export const ArticleForm = (props) => (
    <Form horizontal onSubmit={props.submit}>
      
     <FormGroup controlId="formBasicText">
      <Col sm={12}>
      	<FormControl type="text" placeholder="Give a title to your article..." onChange={props.titleChange} value={props.title} />
      </Col>
     </FormGroup>

     <FormGroup controlId="formControlsTextarea">
     	<Col sm={12}>
        <div className='form-control' style={{minHeight:'150px', resize: 'vertical', overflow: 'scroll'}}>
          <Editor 
            editorState={props.editor} 
            onChange={props.editorChange} 
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
)

ArticleForm.propTypes = {
  submit: PropTypes.func,
  titleChange: PropTypes.func,
  title: PropTypes.string,
  editor: PropTypes.object,
  editorChange: PropTypes.func
};
import React from 'react';
import { Col, Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import '../css/CommentSection.css';

export const CommentSection = (props) => (
    <Form horizontal bsClass='comment-section' style={{display: `${props.showComments}`}} onSubmit={() => props.newComments(props.ArticleIndex, props.commentId)}>
      
      <FormGroup controlId="formControlsTextarea">
        <ControlLabel>Leave your comment below.</ControlLabel>
        <FormControl componentClass="textarea" placeholder="Type in your comment." style={{minHeight:'120px'}} onChange={props.commentChange}/>
      </FormGroup>

      <FormGroup>
        <Col sm={13}>
          <Button type="submit" block={true}>
            Submit
          </Button>
        </Col>
      </FormGroup>

    </Form>
)

CommentSection.propTypes = {
  showComments: PropTypes.string
};

import React from 'react';
import PropTypes from 'prop-types';
import { PageHeader, Panel, Pager } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Moment from 'react-moment';
import Lottie from 'react-lottie';
import * as animationData from '../data/loader_ring.json';
import '../css/ArticlesList.css';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

const ArticlesList = ({blogState, editor, trashArticle, editArticle, loadPage}) => (
  <div className="App">
    <PageHeader className='title'>React Blog</PageHeader>
      <div className='animation-wrapper' style={{display: `${blogState.animation === true? 'none' : 'block'}`}}>
        <Lottie
          options={defaultOptions}
          height={130}
          width={130}
          isStopped={blogState.animation}
        />
      </div>
      {Array.isArray(blogState.articles)? blogState.articles.map(a =>
        <div className='article-wrapper' key={a.id}>
          <LinkContainer to={`/article/${a.id}`} className="article-container">
            <div key={a.id}>
              <Panel header={a.title}>
                <span dangerouslySetInnerHTML={{__html: a.content.substr(0,500) + '...</br></br><b>Click to read more</b>'}} />
                <hr/>
                <span className='timestamp'>Posted <Moment fromNow>{a.timestamp}</Moment>.</span>
                <span className='comments'>{a.comments? `${a.comments.length > 1? `There are ${a.comments.length} comments.` : `There is ${a.comments.length} comment.`}` : 'There are no comments yet.'}</span>
              </Panel>
              <i style={{display: blogState.editMode? 'block' : 'none'}} className="fa fa-pencil" aria-hidden="true" id={a.id} onClick={() => editArticle(a)}></i>
            </div>
          </LinkContainer>
          <i style={{display: blogState.editMode? 'block' : 'none'}} className="fa fa-trash-o" aria-hidden="true" id={a.id} onClick={() => trashArticle(a)}></i>
        </div>) : <p className='nothingness'>{blogState.articles}</p>}
        <Pager>
          <Pager.Item previous href="#" style={{display: blogState.pageIndex === 0? 'none' : 'block'}} disabled={blogState.pageIndex === 0? true : false} onClick={() => loadPage(blogState.pageIndex - 5)}>&larr; Previous Page</Pager.Item>
          <Pager.Item next href="#" disabled={blogState.pageIndex+5 >= blogState.total? true : false} onClick={() => loadPage(blogState.pageIndex + 5)}>Next Page &rarr;</Pager.Item>
        </Pager>
  </div>
);

ArticlesList.propTypes = {
  blogState: PropTypes.object.isRequired,
  editor: PropTypes.object.isRequired,
  trashArticle: PropTypes.func.isRequired,
  loadPage: PropTypes.func.isRequired
}

export default ArticlesList;

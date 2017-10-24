import React from 'react';
import { PageHeader, Panel, Pager } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Moment from 'react-moment';

import '../css/ArticlesList.css';

const ArticlesList = ({blogState, editMode, trashArticle, loadPage}) => (
  <div className="App">
    <PageHeader className='title'>Othman's Blog</PageHeader>
      {Array.isArray(blogState.articles)? blogState.articles.map(a => 
        <div className='article-wrapper' key={a.id}>
          <LinkContainer to={`/article/${a.id}`} className="article-container">
            <div key={a.id}>
              <Panel header={a.title}>
                <span dangerouslySetInnerHTML={{__html: a.content}} />
                <hr/>
                <span className='timestamp'>Posted <Moment fromNow>{a.timestamp}</Moment>.</span>
                <span className='comments'>{a.comments? `${a.comments.length > 1? `There are ${a.comments.length} comments.` : `There is ${a.comments.length} comment.`}` : 'There are no comments yet.'}</span>
              </Panel>
            </div>
          </LinkContainer>
          <i style={{display: editMode? 'block' : 'none'}} className="fa fa-trash-o" aria-hidden="true" id={a.id} onClick={() => trashArticle(a)}></i>
        </div>) : <p className='nothingness'>{blogState.articles}</p>} 
        <Pager>
          <Pager.Item previous href="#" style={{display: blogState.pageIndex === 0? 'none' : 'block'}} disabled={blogState.pageIndex === 0? true : false} onClick={() => loadPage(blogState.pageIndex - 5)}>&larr; Previous Page</Pager.Item>
          <Pager.Item next href="#" disabled={blogState.pageIndex+5 > blogState.total? true : false} onClick={() => loadPage(blogState.pageIndex + 5)}>Next Page &rarr;</Pager.Item>
        </Pager>
  </div>
);

export default ArticlesList;

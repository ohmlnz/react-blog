import React from 'react';
import { PageHeader, Panel } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Moment from 'react-moment';
import '../css/ArticlesList.css';

const ArticlesList = ({articles, trashArticle}) => (
  <div className="App">
    <PageHeader className='title'>Othman's Blog</PageHeader>
      {articles.map(a => 
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
          <i className="fa fa-trash-o" aria-hidden="true" id={a.id} onClick={() => trashArticle(a)}></i>
        </div>)}
  }
  </div>
);


export default ArticlesList;

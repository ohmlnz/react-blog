import React, { Component } from 'react';
import { stateToHTML } from 'draft-js-export-html';
import { EditorState } from 'draft-js';
import { PageHeader, Button } from 'react-bootstrap';
import firebase from 'firebase';
import orderBy from 'lodash/orderBy';
import startsWith from 'lodash/startsWith';

import { ArticleForm } from './components/ArticleForm';
import { ArticlesList } from './components/ArticlesList';
import { toInline, toBlock } from './helpers/toolbar';
import './App.css';
import buttons from './data/buttons.json';
import { posts, addPost, provider, addComment } from './helpers/firebase.js';


class App extends Component {
  state = {
    toolbar: [],
    articles: [],
    title: '',
    editorState: EditorState.createEmpty(),
    user: '',
    userAva: '',
    addArticle: 'none',
    comment: ''
  }

  componentDidMount = () => {
    posts.orderByValue().limitToLast(5).on('value', (snapshot) => {
      const articles = snapshot.val()
      this.setState({ articles: orderBy(articles, ['timestamp'], ['desc']) })
    });
  }

  login = () => {
    provider.addScope('user:email')

    firebase.auth().signInWithPopup(provider).then((result) => {
      const user = result.user; 
      console.log(user)     
      this.setState({ 
        user: user.displayName,
        userAva: user.photoURL,
        addArticle: 'block'
      })
    }).catch(function(error) {
      const errorMessage = error.message;
      console.log(errorMessage)
    })
  }

  logout = () => {
    firebase.auth().signOut().then(() => {
      this.setState({
        user: '',
        addArticle: 'none'
      })
    }).catch(function(error) {
      console.log(error)
    });
  }

  onChange = (editorState) => {
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

  titleChange = (e) => {
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

    const id = this.state.articles.length+1
    const title = this.state.title
    const content = stateToHTML(this.state.editorState.getCurrentContent())
    const timestamp = Date.now()
    const comments = 0
    const showComments = 'none'
    const article = { "id": id, "title": title, "content": content, "timestamp": timestamp, "comments": comments, "showComments": showComments }
    const articles = this.state.articles.concat(article)

    // Push changes to DB
    addPost(id-1, id, title, content, timestamp, comments, showComments)

    // Reset local state
    this.setState({
      articles: orderBy(articles, ['timestamp'], ['desc']),
      title: '',
      editorState: EditorState.createEmpty(),
      toolbar: []
    });
  }

  removeArticle = (e) => {
    const id = e.target.id-1;
    const ref = firebase.database().ref(`posts/${id}`);

    ref.remove(function(error) {
      console.log(error? error : '');
    });
  }

  revealComments = (id, state) => {
    const newState = state === 'none'? 'block' : 'none'
    const elemPos = id-1

    firebase.database().ref().child(`/posts/${elemPos}`)
    .update({ showComments: `${newState}`})
    .catch(function(error) {
      console.log(error);
    })
  }

  commentChange = (e) => {
    this.setState({
      comment: e.target.value
    })
  }

  newComments = (ArticleIndex, commentId) => {
    const index = ArticleIndex-1
    const id = isNaN(commentId)? commentId.length : commentId
    const timestamp = Date.now()

    addComment(index, id, this.state.comment, this.state.user, this.state.userAva, timestamp)
  }

  render() {
    const articles = this.state.articles.length? 
    <ArticlesList articles={this.state.articles} 
                  removeArticle={this.removeArticle} 
                  removeState={this.state.addArticle}
                  revealComments={this.revealComments}
                  newComments={this.newComments}
                  commentChange={this.commentChange}
    /> : <p className='nothingness'>Nothing has been posted yet :'(</p>
    const user = this.state.user.length? this.state.user : 'Login'
    const logout = this.state.user.length? this.logout : this.login

    return (
      <div className="App">
        <div className="button-wrapper">
          <Button onClick={logout}>{user}</Button>
        </div>

        <PageHeader className='title'>React Blog</PageHeader>

        {articles}
        
        <div id='add-article' style={{display: this.state.addArticle}}>
          <PageHeader><small>Add a new entry</small></PageHeader>

          {buttons.block.map((b, index) =>
            <Button 
              key={index}
              bsClass='btn-custom' 
              active={this.state.toolbar.indexOf(`${b.id},true`) !== -1? true: false} 
              onClick={() => this.onChange(toBlock(this.state.editorState, b.id))}>{b.label}
            </Button> 
          )}

          {buttons.inline.map((b, index) =>
            <Button 
              key={index}
              bsClass='btn-custom' 
              active={this.state.toolbar.indexOf(`${b.id},true`) !== -1? true: false} 
              onClick={() => this.onChange(toInline(this.state.editorState, b.id))}>{b.label}
            </Button> 
          )}
                  
          <ArticleForm 
            titleChange={this.titleChange} 
            title={this.state.title} 
            editor={this.state.editorState} 
            editorChange={this.onChange}
            submit={this.submitArticle}
          />
        </div>
      </div>
    );
  }
}

export default App;

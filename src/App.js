import React, { Component } from 'react';
import { stateToHTML } from 'draft-js-export-html';
import { EditorState } from 'draft-js';
import { PageHeader, Button } from 'react-bootstrap';
import firebase from 'firebase';
import orderBy from 'lodash/orderBy';

import { ArticleForm } from './components/ArticleForm';
import { ArticlesList } from './components/ArticlesList';
import { toInline, toBlock } from './helpers/toolbar';
import './App.css';
import buttons from './data/buttons.json';
import { posts, addPost, provider } from './helpers/firebase.js';


class App extends Component {
  state = {
    toolbar: [],
    articles: [],
    title: '',
    editorState: EditorState.createEmpty(),
    user: '',
    addArticle: 'none'
  }

  componentDidMount = () => {
    posts.orderByValue().limitToLast(5).on('value', (snapshot) => {
      var articles = snapshot.val()
      this.setState({ articles: orderBy(articles, ['timestamp'], ['desc']) })
    });
  }

  login = () => {
    provider.addScope('user:email')

    firebase.auth().signInWithPopup(provider).then((result) => {
      var user = result.user;      
      this.setState({ 
        user: user.displayName,
        addArticle: 'block'
      })
    }).catch(function(error) {
      var errorMessage = error.message;
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
    var startKey = editorState.getSelection().getStartKey();
    var selectedBlockType = editorState
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

    if (!this.state.title.length) {
      return
    }

    const id = this.state.articles.length+1
    const title = this.state.title
    const content = stateToHTML(this.state.editorState.getCurrentContent())
    const timestamp = Date.now()

    const article = { "id": id, "title": title, "content": content, "timestamp": timestamp }
    const articles = this.state.articles.concat(article)

    // Push changes to DB
    addPost(id-1, id, title, content, timestamp)

    // Reset local state
    this.setState({
      articles: orderBy(articles, ['timestamp'], ['desc']),
      title: '',
      editorState: EditorState.createEmpty(),
      toolbar: []
    });
  }

  render() {
    const articles = this.state.articles.length? <ArticlesList articles={this.state.articles} /> : ''
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

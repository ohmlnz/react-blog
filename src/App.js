import React, { Component } from 'react';
import { stateToHTML } from 'draft-js-export-html';
import { EditorState } from 'draft-js';
import { PageHeader, Button } from 'react-bootstrap';

import { ArticleForm } from './components/ArticleForm';
import { ArticlesList } from './components/ArticlesList' 
import { toInline, toBlock } from './helpers/toolbar';
import './App.css';
import buttons from './data/buttons.json';
import { posts } from './components/Firebase.js'


class App extends Component {
  state = {
    toolbar: [],
    articles: [],
    title: '',
    editorState: EditorState.createEmpty()
  }

  componentDidMount = () => {
    posts.orderByValue().limitToLast(3).on("value", (snapshot) => {
      var posts = snapshot.val()

      this.setState({ 
        articles: posts
      })
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
    const article = { "id": id, "title": this.state.title, "content": stateToHTML(this.state.editorState.getCurrentContent()) }
    const articles = this.state.articles.concat(article)

    this.setState({
      articles,
      title: '',
      editorState: EditorState.createEmpty(),
      toolbar: []
    });
  }

  render() {

    const articles = this.state.articles.length? <ArticlesList articles={this.state.articles} /> : ''

    return (
      <div className="App">
        <PageHeader className='title'>React Blog</PageHeader>

        {articles}
        
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
    );
  }
}

export default App;

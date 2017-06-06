import React, { Component } from 'react';
import { stateToHTML } from 'draft-js-export-html';
import { EditorState } from 'draft-js';
import { PageHeader, Button } from 'react-bootstrap';

import { ArticleForm } from './components/ArticleForm';
import { ArticlesList } from './components/ArticlesList' 
import { toInline, toBlock } from './helpers/toolbar';
import './App.css';
import buttons from './data/buttons.json';


class App extends Component {
  state = {
    toolbar: [],
    articles: [],
    title: '',
    editorState: EditorState.createEmpty()
  }

  onChange = (editorState) => {
    this.setState({
      editorState,
      toolbar: []
    })

    const styles = editorState.getCurrentInlineStyle()._map._list._tail
    // get current block styles

    if (styles) {
      const newToolbar = styles.array.map(a => a !== undefined? [a[0], a[1]].join(',') : null)      
      this.setState({ toolbar: newToolbar })
      console.log(newToolbar)
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
      editorState: EditorState.createEmpty()
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
            active={this.state.toolbar.indexOf(`{b.id},true`) !== -1? true: false} 
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

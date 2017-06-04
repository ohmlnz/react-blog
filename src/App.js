import React, { Component } from 'react';
import './App.css';
import { ArticleForm } from './components/ArticleForm';
import { ArticlesList } from './components/ArticlesList' 
import { PageHeader, Button } from 'react-bootstrap';
import { EditorState } from 'draft-js';
import { toBold, toItalic, toUnderline, toMonospace, toH1, toH2, toH3,toH4, toH5,  
toH6, toBlockquote, toOL, toUL, toCodeblock } from './helpers/toolbar';
import { stateToHTML } from 'draft-js-export-html';

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

    console.log(editorState.getBlockTree())

    if (styles) {
      const newToolbar = styles.array.map(a => [a[0], a[1]].join(','))      
      this.setState({ toolbar: newToolbar })
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
        
        <Button bsClass='btn-custom' active={this.state.toolbar.indexOf('header-one,true') !== -1? true: false} onClick={() => this.onChange(toH1(this.state.editorState))}>H1</Button> 
        <Button bsClass='btn-custom' active={this.state.toolbar.indexOf('header-two,true') !== -1? true: false} onClick={() => this.onChange(toH2(this.state.editorState))}>H2</Button> 
        <Button bsClass='btn-custom' active={this.state.toolbar.indexOf('header-three,true') !== -1? true: false} onClick={() => this.onChange(toH3(this.state.editorState))}>H3</Button> 
        <Button bsClass='btn-custom' active={this.state.toolbar.indexOf('header-four,true') !== -1? true: false} onClick={() => this.onChange(toH4(this.state.editorState))}>H4</Button> 
        <Button bsClass='btn-custom' active={this.state.toolbar.indexOf('header-five,true') !== -1? true: false} onClick={() => this.onChange(toH5(this.state.editorState))}>H5</Button> 
        <Button bsClass='btn-custom' active={this.state.toolbar.indexOf('header-six,true') !== -1? true: false} onClick={() => this.onChange(toH6(this.state.editorState))}>H6</Button> 
        <Button bsClass='btn-custom' active={this.state.toolbar.indexOf('blockquote,true') !== -1? true: false} onClick={() => this.onChange(toBlockquote(this.state.editorState))}>Blockquote</Button> 
        <Button bsClass='btn-custom' active={this.state.toolbar.indexOf('unordered-list-item,true') !== -1? true: false} onClick={() => this.onChange(toUL(this.state.editorState))}>UL</Button> 
        <Button bsClass='btn-custom' active={this.state.toolbar.indexOf('ordered-list-item,true') !== -1? true: false} onClick={() => this.onChange(toOL(this.state.editorState))}>OL</Button> 
        <Button bsClass='btn-custom' active={this.state.toolbar.indexOf('code-block,true') !== -1? true: false} onClick={() => this.onChange(toCodeblock(this.state.editorState))}>Code Block</Button> 
        
        <Button bsClass='btn-custom' active={this.state.toolbar.indexOf('BOLD,true') !== -1? true : false} onClick={() => this.onChange(toBold(this.state.editorState))}>Bold</Button>
        <Button bsClass='btn-custom' active={this.state.toolbar.indexOf('ITALIC,true') !== -1? true : false} onClick={() => this.onChange(toItalic(this.state.editorState))}>Italic</Button>
        <Button bsClass='btn-custom' active={this.state.toolbar.indexOf('UNDERLINE,true') !== -1? true : false} onClick={() => this.onChange(toUnderline(this.state.editorState))}>Underline</Button>
        <Button bsClass='btn-custom' active={this.state.toolbar.indexOf('CODE,true') !== -1? true : false} onClick={() => this.onChange(toMonospace(this.state.editorState))}>Monospace</Button>
                
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

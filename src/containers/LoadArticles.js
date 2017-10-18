import { connect } from 'react-redux';
import ArticlesList from '../components/ArticlesList';
import { removeArticle } from '../actions/actionCreators';

const mapStateToProps = state => {
	return {
		articles: state.blogState.articles
	}
}

const mapDispatchToProps = dispatch => {
	return {
		trashArticle: post => {
			dispatch(removeArticle(post))
		}
	}
}

const LoadArticles = connect(mapStateToProps, mapDispatchToProps)(ArticlesList);

export default LoadArticles;
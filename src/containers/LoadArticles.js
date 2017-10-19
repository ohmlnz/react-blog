import { connect } from 'react-redux';
import ArticlesList from '../components/ArticlesList';
import { removeArticle, fetchArticles } from '../actions/actionCreators';

const mapStateToProps = state => {
	return {
		blogState: state.blogState
	}
}

const mapDispatchToProps = dispatch => {
	return {
		trashArticle: post => {
			dispatch(removeArticle(post))
		},
		loadPage: index => {
			dispatch(fetchArticles(index))
		}
	}
}

const LoadArticles = connect(mapStateToProps, mapDispatchToProps)(ArticlesList);

export default LoadArticles;
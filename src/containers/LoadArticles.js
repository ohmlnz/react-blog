import { connect } from 'react-redux';
import ArticlesList from '../components/ArticlesList';
import { removeFirebase, fetchArticles } from '../actions/actionCreators';

const mapStateToProps = state => {
	return {
		blogState: state.blogState,
		editMode: state.editMode
	}
}

const mapDispatchToProps = dispatch => {
	return {
		trashArticle: article => {
			dispatch(removeFirebase(article))
		},
		loadPage: index => {
			dispatch(fetchArticles(index))
		}
	}
}

const LoadArticles = connect(mapStateToProps, mapDispatchToProps)(ArticlesList);

export default LoadArticles;
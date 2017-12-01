import { connect } from 'react-redux';
import Article from '../components/Article';
// import { removeFirebase, fetchArticles } from '../actions/actionCreators';

const mapStateToProps = state => {
	return {
		blogState: state.blogState
	}
}

const mapDispatchToProps = dispatch => {
	return {
		// trashArticle: article => {
		// 	dispatch(removeFirebase(article))
		// },
		// loadPage: index => {
		// 	dispatch(fetchArticles(index))
		// }
	}
}

const Single = connect(mapStateToProps, mapDispatchToProps)(Article);

export default Single;
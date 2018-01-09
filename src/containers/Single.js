import { connect } from 'react-redux';
import Article from '../components/Article';
import { updateFirebase } from '../actions/actionCreators';

const mapStateToProps = state => {
	return {
		blogState: state.blogState,
		editor: state.editor
	}
}

const mapDispatchToProps = dispatch => {
	return {
		updateArticle: (index, content, timestamp) => {
			dispatch(updateFirebase(index, content, timestamp))
		}
	}
}

const Single = connect(mapStateToProps, mapDispatchToProps)(Article);

export default Single;
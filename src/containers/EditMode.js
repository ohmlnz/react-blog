import { connect } from 'react-redux';
import EditArticles from '../components/EditArticles';
import { toEdit, addFirebase } from '../actions/actionCreators';

const mapStateToProps = state => {
	return {
		blogState: state.blogState,
		editor: state.editor
	}
}

const mapDispatchToProps = dispatch => {
	return {
		changeMode: current => {
			dispatch(toEdit(current))
		},
		addArticle: (index, id, title, content, timestamp, lastUpdated, comments, showComments) => {
			dispatch(addFirebase(index, id, title, content, timestamp, lastUpdated, comments, showComments))
		}
	}
}

const EditMode = connect(mapStateToProps, mapDispatchToProps)(EditArticles);

export default EditMode;
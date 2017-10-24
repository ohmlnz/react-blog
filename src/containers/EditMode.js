import { connect } from 'react-redux';
import EditArticles from '../components/EditArticles';
import { toEdit } from '../actions/actionCreators';

const mapStateToProps = state => {
	return {
		editMode: state.editMode
	}
}

const mapDispatchToProps = dispatch => {
	return {
		changeMode: current => {
			dispatch(toEdit(current))
		}
	}
}

const EditMode = connect(mapStateToProps, mapDispatchToProps)(EditArticles);

export default EditMode;
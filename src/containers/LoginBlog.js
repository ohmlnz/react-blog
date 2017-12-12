import { connect } from 'react-redux';
import Login from '../components/Login';
import { loginFirebase, logoutFirebase } from '../actions/actionCreators';

const mapStateToProps = state => {
	return {
		blogState: state.blogState
	}
}

const mapDispatchToProps = dispatch => {
	return {
		login: () => {
			dispatch(loginFirebase())
		},
		logout: () => {
			dispatch(logoutFirebase())
		}
	}
}

const LoginBlog = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginBlog;
import React from 'react';
import PropTypes from 'prop-types';
import '../css/Login.css';

const Login = ({ login, logout, blogState }) => (
	<div>
		<div className='signin' onClick={() => {blogState.addArticle === 'block'? logout() : login()}}>
			{blogState.addArticle === 'block'? 'Logout' : 'Login'}
		</div>
	</div>
)

Login.propTypes = {
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  blogState: PropTypes.object.isRequired
}

export default Login;
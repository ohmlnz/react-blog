import React from 'react';
import '../css/Login.css';

const Login = ({ login, logout, blogState }) => (
	<div>
		<div className='signin' onClick={() => {blogState.addArticle === 'block'? logout() : login()}}>
			{blogState.addArticle === 'block'? 'Logout' : 'Login'}
		</div>
	</div>
)

export default Login;
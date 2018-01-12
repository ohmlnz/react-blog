// import fetch from 'isomorphic-fetch';
import firebase from 'firebase'
import { articles, provider } from '../helpers/firebase.js';

export const loginSuccessful = (result, user) => {
	return {
		type: 'LOGIN_SUCCESS',
		result,
		user
	}
}

export const logoutSuccessful = () => {
	return {
		type: 'LOGOUT_SUCCESS'
	}
}

export const toEdit = (current) => {
	return {
		type: 'CHANGE_MODE',
		current
	}
}

export const editContent = (article) => {
	return {
		type: 'EDIT_ARTICLE',
		article
	}
}

export const removeArticle = (article) => {
	return {
		type: 'REMOVE_ARTICLE',
		article
	}
}

export const selectArticle = (article) => {
	return {
		type: 'SELECT_ARTICLE',
		article
	}
}

export const receiveArticles = (pageIndex, total, arr, lastId) => {
	return {
		type: 'RECEIVE_ARTICLES',
		pageIndex,
		total,
		lastId,
		articles: arr,
		receivedAt: Date.now()
	}
}

export const saveEdits = (index, content, timestamp) => {
	return {
		type: 'SAVE_EDITS',
		index,
		content,
		timestamp
	}
}

export function fetchArticles(pageIndex) {
  return function (dispatch) {
  	// fix this crap
		const end = pageIndex + 5;
		let total;
		let lastId = null;

		articles.once('value', (snapshot) => {
   		total = snapshot.numChildren();
			const a = [];
			snapshot.forEach(function(childSnapshot) {
				a.push(childSnapshot.val());
			});
			if (a.length) {
				lastId = a[a.length-1].id;
			}
			const arr = a.slice(pageIndex, end)
			dispatch(receiveArticles(pageIndex, total, arr, lastId))
    });
  }
}

// Remove article from Firebase
export function removeFirebase(article) {
	return function(dispatch) {
  	const ref = firebase.database().ref(`articles/${article.initIndex}`);
  	ref.remove()
  	.then(function() {
			dispatch(removeArticle(article));
			console.log('success')
  	})
  	.catch(function(err) {
  		console.log(err);
  	})
  }
}

// Add article to Firebase
export function addFirebase(index, id, title, content, timestamp, comments, showComments) {
	const init = index !== -1? index : 0;

	return function(dispatch) {
  	firebase.database().ref('articles/' + index).set({
	  	id: id,
	  	initIndex: init,
	    title: title,
	    content: content,
	    timestamp: timestamp,
	    comments: comments,
	    showComments: showComments
	  })
  	.then(function() {
			dispatch(fetchArticles(0));
			console.log('success')
  	})
  	.catch(function(err) {
  		console.log(err);
  	})
  }
}

// Update article to Firebase
export function updateFirebase(index, content, timestamp) {
	return function(dispatch) {
		firebase.database().ref('articles/' + index).update({
			content: content,
			lastEdit: timestamp
		})
		.then(function() {
			dispatch(saveEdits(index, content, timestamp))
			console.log('success')
  	})
  	.catch(function(err) {
  		console.log(err);
  	})
	}
}

// Login
export function loginFirebase() {
	return function(dispatch) {
		provider.addScope('user:email')
    firebase.auth().signInWithPopup(provider).then((result) => {
      const user = result.user;
      dispatch(loginSuccessful(result, user))
    }).catch(function(error) {
      const errorMessage = error.message;
      console.log(errorMessage)
    })
	}
}

// Logout
export function logoutFirebase() {
	return function(dispatch) {
		firebase.auth().signOut().then(() => {
		dispatch(logoutSuccessful())
	  }).catch(function(error) {
	    console.log(error)
	  });
	}
}


// // Add a comment
// export function addComment(commentId) {
// 	return {
// 		type: 'ADD_COMMENT',
// 		commentId
// 	}
// }
// // Like or star an article
// export function favArticle(commentId) {
// 	return {
// 		type: 'FAV_ARTICLE',
// 		commentId
// 	}
// }

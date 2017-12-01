// import fetch from 'isomorphic-fetch';
import firebase from 'firebase'
import { articles } from '../helpers/firebase.js';

export const toEdit = (current) => {
	return {
		type: 'CHANGE_MODE',
		current
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

export const receiveArticles = (pageIndex, total, json, lastId) => {
	return {
		type: 'RECEIVE_ARTICLES',
		pageIndex,
		total,
		lastId,
		articles: json,
		receivedAt: Date.now()
	}
}

export function fetchArticles(pageIndex) {
  return function (dispatch) {
		const end = pageIndex + 4;
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
			dispatch(fetchArticles(0)); // add redux action
			console.log('success')
  	})
  	.catch(function(err) {
  		console.log(err);
  	})
  }
}


// // Remove a comment
// export function removeComment(commentId) {
// 	return {
// 		type: 'REMOVE_COMMENT',
// 		commentId
// 	}
// }
// // Add a comment
// export function addComment(commentId) {
// 	return {
// 		type: 'REMOVE_ARTICLE',
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

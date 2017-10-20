// import fetch from 'isomorphic-fetch';
import firebase from 'firebase'
import { articles } from '../helpers/firebase.js';

export const removeArticle = (article) => {
	return {
		type: 'REMOVE_ARTICLE',
		article
	}
}

export const selectedPage = (pageIndex) => {
	return {
		type: 'SELECTED_PAGE',
		pageIndex
	}
}

export const receiveArticles = (pageIndex, total, json) => {
	return {
		type: 'RECEIVE_ARTICLES',
		pageIndex,
		total,
		articles: json,
		receivedAt: Date.now()
	}
}

export function fetchArticles(pageIndex) {
  return function (dispatch) {
		const end = pageIndex + 4;
		let total;

		articles.once('value', (snapshot) => {	
   		total = snapshot.numChildren(); 
			const a = [];
			snapshot.forEach(function(childSnapshot) {
				a.push(childSnapshot.val());
			});
			const arr = a.slice(pageIndex, end)
			dispatch(receiveArticles(pageIndex, total, arr))
    });
  }
}

// Remove article from Firebase
export function removeFirebase(article) {
	return function(dispatch) {
  	const ref = firebase.database().ref(`articles/${article.id}`);
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



// // Add an article
// export function addArticle(articleId) {
// 	return {
// 		type: 'ADD_ARTICLE',
// 		articleId
// 	}
// }


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
// // Next page and previous page

// import fetch from 'isomorphic-fetch';
import { articles } from '../helpers/firebase.js';

export const selectedPage = (pageIndex) => {
	return {
		type: 'SELECTED_PAGE',
		pageIndex
	}
}

export const receiveArticles = (pageIndex, json) => {
	return {
		type: 'RECEIVE_ARTICLES',
		pageIndex,
		articles: json,
		receivedAt: Date.now()
	}
}

export function fetchArticles(pageIndex) {
  return function (dispatch) {
		const end = pageIndex + 4;

		articles.orderByChild('id').startAt(pageIndex).endAt(end).on('value', (snapshot) => {
    	setTimeout(() => {
				let articles = snapshot.val() || [];
				if (Array.isArray(articles) !== true) {
					const arr = [];
					Object.entries(articles).forEach(([key, val]) => {
				    arr.push(val);  
					});
					articles = arr;
				}

				dispatch(receiveArticles(pageIndex, articles))
      }, 0);
		});
  }
}



// Remove an article
export const removeArticle = (post) => {
	return {
		type: 'REMOVE_ARTICLE',
		post
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

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
		pageIndex = pageIndex !== 1? pageIndex * 5: pageIndex + 4;

		articles.orderByChild('id').startAt(pageIndex).on('value', (snapshot) => {
    	setTimeout(() => {
				const articles = snapshot.val() || [];
				dispatch(receiveArticles(pageIndex, articles))
      }, 0);
		});
    // return fetch(`https://jsonplaceholder.typicode.com/posts/${pageIndex}`)
    //   .then(
    //     response => response.json(),
    //     error => console.log('An error occured.', error)
    //   )
    //   .then(json =>
    //     dispatch(receiveArticles(pageIndex, json))
    //   )
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

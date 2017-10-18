import firebase from 'firebase'
import { config } from '../config.js'

firebase.initializeApp(config);

export const articles = firebase.database().ref('articles');

export const provider = new firebase.auth.GithubAuthProvider();

export const addPost = (index, id, title, content, timestamp, comments, showComments) => {
  firebase.database().ref('articles/' + index).set({
  	id: id,
    title: title,
    content: content,
    timestamp: timestamp,
    comments: comments,
    showComments: showComments
  });
}

export const addComment = (index, id, content, author, avatar, profile, timestamp) => {
	firebase.database().ref(`articles/${index}/comments/${id}`).set({
		id: id,
		content: content,
		author: author,
		avatar: avatar,
    profile: profile,
		timestamp: timestamp
	});
}

import firebase from 'firebase'
import { config } from '../config.js'

firebase.initializeApp(config);

// Add initial post to prevent DB from fucking everything up
firebase.database().ref('posts/' + 0).set({
  	id: 1,
    title: 'Your first blog entry!',
    content: 'Here\'s your initial post on this awesome platform!',
    timestamp: 0
  });

export const posts = firebase.database().ref('posts');

export const provider = new firebase.auth.GithubAuthProvider();

export const addPost = (index, id, title, content, timestamp) => {
  firebase.database().ref('posts/' + index).set({
  	id: id,
    title: title,
    content: content,
    timestamp: timestamp
  });
}

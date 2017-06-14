import firebase from 'firebase'
import { config } from '../config.js'

firebase.initializeApp(config);

export const posts = firebase.database().ref('posts');

export const provider = new firebase.auth.GithubAuthProvider();

export const addPost = (index, id, title, content) => {
  firebase.database().ref('posts/' + index).set({
  	id: id,
    title: title,
    content: content
  });
}

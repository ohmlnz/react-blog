import firebase from 'firebase'
import { config } from '../config.js'

firebase.initializeApp(config);

const fbd = firebase.database();

export const posts = fbd.ref('posts');

export const writeUserData = (id, title, content) => {
  fbd.ref('posts/' + id).set({
    title: title,
    content: content
  });
}

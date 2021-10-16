import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

import {
  PUBLIC_FIREBASE_API_KEY,
  PUBLIC_FIREBASE_PROJECT_ID,
} from '../util/consts';

const config = {
  apiKey: PUBLIC_FIREBASE_API_KEY,
  authDomain: `${PUBLIC_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${PUBLIC_FIREBASE_PROJECT_ID}-default-rtdb.firebaseio.com/`,
  projectId: PUBLIC_FIREBASE_PROJECT_ID,
};

function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
}

initFirebase();

export { firebase };

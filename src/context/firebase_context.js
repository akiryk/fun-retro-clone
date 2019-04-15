import React from 'react';
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

const FirebaseContext = React.createContext(null);

const config = {
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.GATSBY_FIREBASE_DATABASE_URL,
  projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
  storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    /* Firebase APIs */
    this.auth = app.auth();
    this.db = app.database();
    this.firestore = app.firestore();
  }

  // *** Merge Auth and DB User API *** //
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();
            console.log(authUser.uid);
            // default empty roles
            if (dbUser && !dbUser.roles) {
              dbUser.roles = [];
            }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: 'http://www.google.com',
    });

  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  // *** Stories API ***
  stories = () => this.firestore.collection('stories');
  story = id => this.firestore.doc(`stories/${id}`);

  // *** Retro Board API ***
  // *** Firestore ***
  // retroBoardsList = () => this.firestore.collection('retroBoards');
  retroBoardsList = () => this.db.ref('retroBoards');
  // getRetroBoards = () => this.retroBoardsList().get();
  retroBoard = id => this.db.ref(`retroBoards/${id}`);

  // *** Real time Database ***
  comment = id => this.db.ref(`comments/${id}`);
  comments = () => this.db.ref('comments');
}

let firebase;

export const getFirebase = () => {
  if (!firebase) {
    firebase = new Firebase();
  }

  return firebase;
};

const FirebaseProviderHOC = ({ children }) => (
  <FirebaseContext.Provider value={getFirebase()}>
    {children}
  </FirebaseContext.Provider>
);

export default FirebaseContext;

export { FirebaseProviderHOC };

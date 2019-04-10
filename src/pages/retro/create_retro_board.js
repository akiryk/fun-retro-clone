import React, { useState } from 'react';
import { navigate } from 'gatsby';
import * as ROUTES from '../../constants/routes';
import withFirebaseConsumer from '../../components/firebase/with_firebase_consumer';

const handleSubmit = (firebase, title) => {
  firebase.firestore
    .collection('retroBoards')
    .add({
      title,
    })
    .then(docRef => {
      if (docRef && docRef.id) {
        navigate(`${ROUTES.RETRO}/${docRef.id}`);
      } else {
        throw new Error('No document reference ID');
      }
    })
    .catch(function(error) {
      console.error('Error writing document: ', error);
    });
};

const CreateRetroBoard = ({ firebase }) => {
  const [title, setTitle] = useState('');
  return (
    <>
      <h1>Create A Retro Board</h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSubmit(firebase, title);
        }}
      >
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          id="title"
          onChange={e => {
            setTitle(e.target.value);
          }}
        />
        <button>Submit</button>
      </form>
    </>
  );
};

export default withFirebaseConsumer(CreateRetroBoard);

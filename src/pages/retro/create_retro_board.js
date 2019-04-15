import React, { useState } from 'react';
import { navigate } from 'gatsby';
import * as ROUTES from '../../constants/routes';
import withFirebaseConsumer from '../../components/firebase/with_firebase_consumer';

const handleSubmit = (firebase, title) => {
  const newKey = firebase.db
    .ref()
    .child('retroBoards')
    .push().key;

  firebase.db
    .ref()
    .child(`/retroBoards/${newKey}`)
    .set(
      {
        title,
        column0: 'Happy',
        column1: 'Meh',
        column2: 'Sad',
      },
      () => {
        navigate(`${ROUTES.RETRO}/${newKey}`);
      }
    );
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

import React, { useState, useEffect } from 'react';
import withFirebaseConsumer from '../../components/firebase/with_firebase_consumer';

const RetroBoard = props => {
  useEffect(() => {
    props.firebase
      .retroBoard(props.id)
      .get()
      .then(doc => {
        const { title } = doc.data();
        setBoardTitle(title);
      });
  }, []);

  const [boardTitle, setBoardTitle] = useState('loading...');

  return (
    <>
      <h2>{boardTitle}</h2>
      <p>And stuff...</p>
    </>
  );
};

export default withFirebaseConsumer(RetroBoard);

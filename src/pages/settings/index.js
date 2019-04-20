import React, { useState, useEffect } from 'react';
import withFirebaseConsumer from '../../components/firebase/with_firebase_consumer';
import Layout from '../../components/layout';
import RetroBoardsList from '../../components/retro_boards/retro_boards_list';
import { Match } from '@reach/router';
import { navigate } from 'gatsby';
import * as ROUTES from '../../constants/routes';

const EditBoard = props => {
  const { firebase, id } = props;
  const [title, setTitle] = useState('');
  const [currentTitle, setCurrentTitle] = useState('...');

  useEffect(() => {
    firebase.retroBoard(id).once('value', snapshot => {
      const board = snapshot.val();
      setTitle(board.title);
      setCurrentTitle(board.title);
    });
  }, []);

  const handleChange = e => {
    setTitle(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    firebase
      .retroBoard(id)
      .update({
        title,
      })
      .then(() => {
        navigate(ROUTES.RETRO);
      });
  };

  return (
    <>
      <h1>Edit {currentTitle}</h1>
      <form onSubmit={handleSubmit}>
        <label>Update Board Title</label>
        <input type="text" placeholder={title} onChange={handleChange} />
        <button>Submit</button>
      </form>
    </>
  );
};

const EditRetroBoardPage = ({ firebase }) => (
  <Layout>
    <Match path="/settings/:id">
      {props =>
        props.match ? (
          <EditBoard firebase={firebase} {...props.match} />
        ) : (
          <RetroBoardsList />
        )
      }
    </Match>
  </Layout>
);

export default withFirebaseConsumer(EditRetroBoardPage);

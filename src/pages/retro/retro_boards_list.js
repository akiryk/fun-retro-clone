import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import withFirebaseConsumer from '../../components/firebase/with_firebase_consumer';
import * as ROUTES from '../../constants/routes';

const getBoardsList = board => (
  <li key={board.id}>
    <Link to={`${ROUTES.RETRO}/${board.id}`}>{board.title}</Link>
  </li>
);

const RetroBoardsList = ({ firebase }) => {
  const [boardsData, setBoardsData] = useState([]);

  useEffect(() => {
    firebase.getRetroBoards().then(querySnapshot => {
      const boards = querySnapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data().title,
      }));
      setBoardsData(boards);
    });
  }, []);

  return (
    <>
      <h3>A List of Boards</h3>
      {boardsData.length > 0 ? (
        <ul>{boardsData.map(getBoardsList)}</ul>
      ) : (
        <p>Wait.</p>
      )}
    </>
  );
};

export default withFirebaseConsumer(RetroBoardsList);

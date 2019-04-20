import React, { useState, useEffect } from 'react';
import RetroBoardColumn from '../../components/retro_boards/retro_board_column';
import PropTypes from 'prop-types';
import withFirebaseConsumer from '../../components/firebase/with_firebase_consumer';

const RetroBoard = props => {
  const [boardTitle, setBoardTitle] = useState('loading...');
  const [comments, setComments] = useState(null);
  const [columnLabels, setColumnLabels] = useState([]);

  const { firebase, id: boardId } = props;

  // Fetch the Retro Board from Firebase
  useEffect(() => {
    firebase.retroBoard(boardId).once('value', snapshot => {
      const board = snapshot.val();
      setBoardTitle(board.title);

      // set column labels
      let counter = 0;
      let tempCols = [];
      while (board[`column${counter}`]) {
        tempCols = [...tempCols, board[`column${counter}`]];
        counter = counter + 1;
      }
      setColumnLabels(tempCols);
    });
  }, []);

  // Fetch comments for this board
  useEffect(() => {
    firebase.commentsPerBoard(boardId).on('value', snapshot => {
      const comments = snapshot.val();
      // we have an object with goods, sads, and mehs.
      // make it into three arrays of those things
      const columnKeys = comments ? Object.keys(comments) : [];
      const commentsContainer = {}; // will have "good", "meh", and "sad"
      columnKeys.forEach(key => {
        const columnComments = Object.keys(comments[key]).reduce(
          (allComments, commentId) => {
            const comment = { ...comments[key][commentId], id: commentId };
            allComments.push(comment);
            return allComments;
          },
          []
        );
        commentsContainer[key] = columnComments;
      });
      setComments(commentsContainer);
    });
  }, []);

  return (
    <>
      <h1>{boardTitle}</h1>
      {comments && (
        <>
          <RetroBoardColumn
            columnId={0}
            label={columnLabels[0]}
            comments={comments['column0']}
            boardId={boardId}
          />
          <RetroBoardColumn
            columnId={1}
            label={columnLabels[1]}
            comments={comments['column1']}
            boardId={boardId}
          />
          <RetroBoardColumn
            columnId={2}
            label={columnLabels[2]}
            comments={comments['column2']}
            boardId={boardId}
          />
        </>
      )}
    </>
  );
};

RetroBoard.propTypes = {
  firebase: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
};

export default withFirebaseConsumer(RetroBoard);

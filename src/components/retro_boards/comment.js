/**
 * A list of comments
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CreateComment from './create_comment';
import withFirebaseConsumer from '../firebase/with_firebase_consumer';

const deleteComment = ({ boardId, columnId, commentId, firebase }) => {
  firebase.db
    .ref(`commentsPerBoard/${boardId}/column${columnId}`)
    .child(commentId)
    .remove();
};

const Comment = ({ boardId, columnId, comment, firebase }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <li key={comment.id}>
      {isEditing ? (
        <>
          <CreateComment
            comment={comment}
            boardId={boardId}
            columnId={columnId}
            onSave={() => {
              setIsEditing(false);
            }}
          />
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </>
      ) : (
        <>
          {comment.commentText} |{' '}
          <button type="button" onClick={() => setIsEditing(!isEditing)}>
            Edit
          </button>{' '}
          |{' '}
          <button
            type="button"
            onClick={() => {
              deleteComment({
                boardId,
                columnId,
                commentId: comment.id,
                firebase,
              });
            }}
          >
            Delete
          </button>
        </>
      )}
    </li>
  );
};

Comment.propTypes = {
  boardId: PropTypes.string.isRequired,
  columnId: PropTypes.string.isRequired,
  comment: PropTypes.node.isRequired,
  firebase: PropTypes.object.isRequired,
};

export default withFirebaseConsumer(Comment);

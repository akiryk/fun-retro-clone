import React, { useState } from 'react';
import withFirebaseConsumer from '../firebase/with_firebase_consumer';
import PropTypes from 'prop-types';

const CreateComment = ({ firebase, boardId, columnId, onSave, comment }) => {
  const defaultText = comment ? comment.commentText : '';
  const [commentText, setCommentText] = useState(defaultText);

  const handleSubmit = e => {
    e.preventDefault();

    if (!commentText) return;

    const newCommentKey = firebase.db.ref(`commentsPerBoard/${boardId}`).push()
      .key;

    const commentData = {
      commentText,
    };

    if (comment) {
      firebase.db
        .ref(`commentsPerBoard/${boardId}/column${columnId}/${comment.id}`)
        .update(commentData, () => {
          onSave();
        });
    } else {
      firebase.db
        .ref(`commentsPerBoard/${boardId}/column${columnId}/${newCommentKey}`)
        .set(commentData, () => {
          setCommentText('');
          onSave();
        });
    }
  };

  const handleChange = e => {
    setCommentText(e.target.value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <textarea
        rows="3"
        cols="33"
        onChange={handleChange}
        value={commentText}
      />
      <div>
        <button>Add</button>
      </div>
    </form>
  );
};

CreateComment.propTypes = {
  firebase: PropTypes.object.isRequired,
  boardId: PropTypes.string.isRequired,
  columnId: PropTypes.string.isRequired,
  onSave: PropTypes.func,
  comment: PropTypes.object,
};

CreateComment.defaultProps = {
  onSave() {},
  comment: null,
};
export default withFirebaseConsumer(CreateComment);

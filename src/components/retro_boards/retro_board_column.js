import React, { useState } from 'react';
import CreateComment from './create_comment';
import ContentEditable from '../content_editable';
import withFirebaseConsumer from '../firebase/with_firebase_consumer';
import PropTypes from 'prop-types';
import Comment from './comment';

const makeColumnNameUpdate = (fb, boardId, columnId) => name => {
  fb.db.ref(`retroBoards/${boardId}/column${columnId}`).set(name);
};

const RetroBoardColumn = ({ firebase, label, comments, boardId, columnId }) => {
  const [showAddComment, setShowAddComment] = useState(false);

  const toggleShowAddComment = () => {
    setShowAddComment(!showAddComment);
  };

  const handleOnSave = () => {
    setShowAddComment(false);
  };

  return (
    <section>
      <ContentEditable
        text={label}
        handleSubmit={makeColumnNameUpdate(firebase, boardId, columnId)}
      />
      <button type="button" onClick={toggleShowAddComment}>
        Add Comment
      </button>

      <ul>
        {showAddComment && (
          <li key="mainAddComment">
            <CreateComment
              boardId={boardId}
              columnId={columnId}
              onSave={handleOnSave}
            />
          </li>
        )}
        {comments &&
          comments.map(comment => (
            <Comment comment={comment} boardId={boardId} columnId={columnId} />
          ))}
      </ul>
    </section>
  );
};

RetroBoardColumn.propTypes = {
  columnId: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  comments: PropTypes.array,
  boardId: PropTypes.string.isRequired,
};

RetroBoardColumn.defaultProps = {
  comments: [],
};

export default withFirebaseConsumer(RetroBoardColumn);

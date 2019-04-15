import React from 'react';
import CommentList from './comment_list';
import CreateComment from './create_comment';
import ContentEditable from '../../components/content_editable';
import withFirebaseConsumer from '../../components/firebase/with_firebase_consumer';
import PropTypes from 'prop-types';

const makeColumnNameUpdate = (fb, boardId, columnId) => name => {
  fb.db.ref(`retroBoards/${boardId}/column${columnId}`).set(name);
};

const RetroBoardColumn = ({ firebase, label, comments, boardId, columnId }) => (
  <section>
    <ContentEditable
      text={label}
      handleSubmit={makeColumnNameUpdate(firebase, boardId, columnId)}
    />
    {comments && <CommentList comments={comments} />}
    <CreateComment label={label} boardId={boardId} columnId={columnId} />
  </section>
);

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

/**
 * A list of comments
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CreateComment from './create_comment';
import withFirebaseConsumer from '../firebase/with_firebase_consumer';
import CounterContext from '../counter/counter_context';
import SessionContext from '../../context/session_context';

const Voter = ({
  upVote,
  downVote,
  canKeepVoting,
  totalVoteCount,
  commentId,
  firebase,
}) => {
  const [voteCount, setVoteCount] = useState(null);

  useEffect(() => {
    firebase.db.ref(`votesPerComment/${commentId}`).on('value', snapshot => {
      if (snapshot.exists()) {
        console.log('set the vote count to', snapshot.val());
        setVoteCount(snapshot.val());
      } else {
        console.log("this comment id doesn't exist in db!!!");
      }
    });
  });

  const handleUpVote = () => {
    upVote(commentId);
    // if (canKeepVoting()) {
    //   upVote(commentId);
    // setVoteCount(voteCount + 1);
    // Todo: add vote count to this comment
    // firebase.db.ref('votesPerComment').update({
    //   [commentId]:
    // });
    // }
  };

  const handleDownVote = () => {
    // setVoteCount(voteCount - 1);
    downVote();
  };

  return (
    <>
      {voteCount > 0 && <span>Your vote count is {voteCount}</span>}
      {` | `}
      Total Vote Count is: {totalVoteCount}
      <button type="button" onClick={handleUpVote}>
        Up Vote
      </button>
      {voteCount > 0 && (
        <button type="button" onClick={handleDownVote}>
          Down Vote
        </button>
      )}
    </>
  );
};

const Comment = ({ boardId, columnId, comment, firebase }) => {
  const [isEditing, setIsEditing] = useState(false);

  const deleteComment = () => {
    firebase.db
      .ref(`commentsPerBoard/${boardId}/column${columnId}`)
      .child(comment.id)
      .remove();
  };

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
          <button type="button" onClick={deleteComment}>
            Delete
          </button>
          <SessionContext.Consumer>
            {authUser => (
              <CounterContext.Consumer>
                {value => (
                  <Voter
                    boardId={boardId}
                    authUser={authUser}
                    commentId={comment.id}
                    firebase={firebase}
                  />
                )}
              </CounterContext.Consumer>
            )}
          </SessionContext.Consumer>
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

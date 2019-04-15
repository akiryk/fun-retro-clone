import React, { useState } from 'react';
import withFirebaseConsumer from '../../components/firebase/with_firebase_consumer';

const Comment = ({ firebase, label, boardId, columnId }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    // const commentsRef = firebase.db.ref(`commentsPerBoard/${boardId}`);

    const newCommentKey = firebase.db.ref(`commentsPerBoard/${boardId}`).push()
      .key;

    const commentData = {
      commentText: comment,
    };

    firebase.db
      .ref(`commentsPerBoard/${boardId}/column${columnId}/${newCommentKey}`)
      .set(commentData, () => {
        setComment('');
      });

    // Save comment to the realtime db
    // firebaseDbRef.child('/comments/' + newPostKey).set(commentData, () => {
    //   setComment('');
    // });

    // Save comment's id to the retroBoard parent
    // firebaseDbRef
    //   .child(`/retroBoards/${boardId}/comments`)
    //   .update({ [newPostKey]: true });
  };

  const handleChange = e => {
    setComment(e.target.value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor={label}>Enter a comment:</label>
      </div>
      <textarea
        id={label}
        name={label}
        rows="3"
        cols="33"
        onChange={handleChange}
        value={comment}
      />
      <div>
        <button>Add</button>
      </div>
    </form>
  );
};

export default withFirebaseConsumer(Comment);

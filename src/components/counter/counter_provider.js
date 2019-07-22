import React from 'react';
import CounterContext from './counter_context';
import retro_constants from '../retro_boards/retro_constants';
import withFirebaseConsumer from '../firebase/with_firebase_consumer';

const { MAX_VOTES } = retro_constants;

class CounterProvider extends React.Component {
  state = {
    count: 0,
    boardId: null,
    totalVoteCount: 0,
  };

  componentDidMount() {
    const { id: boardId, uid } = this.props;
    this.setState({
      boardId,
    });
    this.votesPerCommentRef = this.props.firebase.db.ref(`votesPerComment`);
    this.votesPerBoardPerUserRef = this.props.firebase.db.ref(
      `votesPerBoardPerUser`
    );
    this.votesPerBoardPerUserRef.child(uid).once('value', userSnap => {
      if (userSnap.exists()) {
        console.log('the user exists');
        this.votesPerBoardPerUserRef
          .child(uid)
          .child(boardId)
          .on('value', boardSnap => {
            if (boardSnap.exists()) {
              console.log('the board exists and so do the votes');
              this.setState({
                count: boardSnap.child('votes').val(),
              });
            } else {
              console.log('the board does not exist');
              // create the board record
              this.votesPerBoardPerUserRef
                .child(uid)
                .child(boardId)
                .update({
                  votes: 0,
                });
            }
          });
      } else {
        // create the user record
        console.log('the user does not exist, nor the board, nor the votes');
        this.votesPerBoardPerUserRef.update({
          [uid]: {
            [boardId]: {
              votes: 0,
            },
          },
        });
      }
    });
  }

  updateDb = commentId => {
    // add vote to the user's tally for this retro board
    const { uid, id: boardId } = this.props;
    const votes = this.state.count;
    this.votesPerBoardPerUserRef
      .child(uid)
      .child(boardId)
      .update({
        votes,
      });

    // add vote to the total count for this comment
    // Todo: Use data transaction
    this.votesPerCommentRef.child(commentId).once('value', snapshot => {
      const curVal = snapshot.val() + 1;
      this.votesPerCommentRef.update({
        [commentId]: curVal,
      });
    });
  };

  upVote = commentId => {
    if (this.state.count === MAX_VOTES) return;
    this.setState(
      ({ count }) => ({ count: ++count }),
      () => this.updateDb(commentId)
    );
  };

  downVote = () => {
    if (this.state.count === 0) return;
    this.setState(({ count }) => ({ count: --count }), this.updateDb);
  };

  reset = () => {
    this.setState({
      count: 0,
    });
  };

  canKeepVoting = () => this.state.count < MAX_VOTES;

  render() {
    return (
      <CounterContext.Provider
        value={{
          upVote: this.upVote,
          downVote: this.downVote,
          canKeepVoting: this.canKeepVoting,
          totalVoteCount: this.state.count,
          count: this.state.count,
        }}
      >
        {this.props.children}
      </CounterContext.Provider>
    );
  }
}

export default withFirebaseConsumer(CounterProvider);

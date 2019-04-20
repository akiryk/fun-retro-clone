import React from 'react';
import { Link } from 'gatsby';
import withFirebaseConsumer from '../../components/firebase/with_firebase_consumer';
import * as ROUTES from '../../constants/routes';

class RetroBoardsList extends React.Component {
  state = {
    boards: [],
  };

  componentDidMount() {
    const retroBoardRef = this.props.firebase.db.ref('retroBoards');
    retroBoardRef.on('value', snapshot => {
      const boardsObject = snapshot.val();
      const boardsList = Object.keys(boardsObject).map(key => ({
        ...boardsObject[key],
        id: key,
      }));

      this.setState({ boards: boardsList });
    });
  }

  handleDeleteBoard = board => {
    // Todo: make a real confirmation modal
    const confirmed = window.confirm('are you sure?');
    if (confirmed) {
      // const boardRef = this.props.firebase.db.ref(`retroBoards/${board.id}`);
      const db = this.props.firebase.db;
      db.ref(`retroBoards`)
        .child(board.id)
        .remove()
        .then(() => {
          // Todo, show some ui feedback
        })
        .catch(error => {
          // Todo: handle error
          console.log('Remove failed: ' + error.message);
        });
      db.ref(`commentsPerBoard`)
        .child(board.id)
        .remove();
    }
  };

  makeDeleteFn = board => () => {
    this.handleDeleteBoard(board);
  };

  getBoardsList = board => (
    <li key={board.id}>
      <Link to={`${ROUTES.RETRO}/${board.id}`}>{board.title}</Link>
      <button type="button" onClick={this.makeDeleteFn(board)}>
        Delete
      </button>
      <Link to={`${ROUTES.EDIT_RETRO}/${board.id}`}>Edit</Link>
    </li>
  );

  render() {
    const { boards } = this.state;
    return (
      <>
        <h3>A List of Boards</h3>
        {boards.length > 0 ? (
          <ul>{boards.map(this.getBoardsList)}</ul>
        ) : (
          <p>Wait.</p>
        )}
      </>
    );
  }
}

export default withFirebaseConsumer(RetroBoardsList);

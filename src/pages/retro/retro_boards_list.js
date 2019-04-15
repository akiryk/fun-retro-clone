import React from 'react';
import { Link } from 'gatsby';
import withFirebaseConsumer from '../../components/firebase/with_firebase_consumer';
import * as ROUTES from '../../constants/routes';

const getBoardsList = board => (
  <li key={board.id}>
    <Link to={`${ROUTES.RETRO}/${board.id}`}>{board.title}</Link>
  </li>
);

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

  render() {
    const { boards } = this.state;
    return (
      <>
        <h3>A List of Boards</h3>
        {boards.length > 0 ? (
          <ul>{boards.map(getBoardsList)}</ul>
        ) : (
          <p>Wait.</p>
        )}
      </>
    );
  }
}

export default withFirebaseConsumer(RetroBoardsList);

import React from 'react';
import withLayout from '../../components/layouts';
import withFirebaseConsumer from '../../components/firebase/with_firebase_consumer';
import withAuthorizationConsumer from '../../components/session/with_authorization_consumer';
import * as ROUTES from '../../constants/routes';
import { Match } from '@reach/router';
import RetroBoardsList from '../../components/retro_boards/retro_boards_list';
import RetroBoard from './retro_board';
import CreateRetroBoard from './create_retro_board';

const RetroPage = () => {
  return (
    <Match path={ROUTES.RETRO_PAGE}>
      {props =>
        props.match ? (
          <RetroBoard {...props.match} />
        ) : (
          <>
            <RetroBoardsList />
            <CreateRetroBoard />
          </>
        )
      }
    </Match>
  );
};

const condition = authUser => !!authUser;
const RetroPageWithAuth = withAuthorizationConsumer(condition)(RetroPage);

export default withLayout(withFirebaseConsumer(RetroPageWithAuth));

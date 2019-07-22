import React from 'react';
import withLayout from '../../components/layouts';
import withFirebaseConsumer from '../../components/firebase/with_firebase_consumer';
import withAuthorizationConsumer from '../../components/session/with_authorization_consumer';
import * as ROUTES from '../../constants/routes';
import { Match } from '@reach/router';
import RetroBoardsList from '../../components/retro_boards/retro_boards_list';
import RetroBoard from './retro_board';
import CreateRetroBoard from './create_retro_board';
import CounterProvider from '../../components/counter/counter_provider';

const RetroPage = ({ uid }) => {
  return (
    <Match path={ROUTES.RETRO_PAGE}>
      {props =>
        props.match ? (
          <CounterProvider {...props.match} uid={uid}>
            <RetroBoard {...props.match} />
          </CounterProvider>
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

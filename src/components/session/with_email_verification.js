import React from 'react';

// SessionContext is same as AuthUserContext from the tutorial
import SessionContext from '../../context/session_context';
import { withFirebaseConsumer } from '../firebase/with_firebase_consumer';

const needsEmailVerification = authUser =>
  authUser &&
  !authUser.emailVerified &&
  authUser.providerData
    .map(provider => provider.providerId)
    .includes('password');

const withEmailVerification = Component => {
  class WithEmailVerification extends React.Component {
    state = { isSent: false };

    onSendEmailVerification = () => {
      this.props.firebase
        .doSendEmailVerification()
        .then(() => this.setState({ isSent: true }));
    };
    render() {
      return (
        <SessionContext.Consumer>
          {authUser =>
            needsEmailVerification(authUser) ? (
              <div>
                {this.state.isSent ? (
                  <p>
                    E-Mail confirmation sent: Check you E-Mails (Spam folder
                    included) for a confirmation E-Mail. Refresh this page once
                    you confirmed your E-Mail.
                  </p>
                ) : (
                  <>
                    <p>
                      Verify your E-Mail: Check you E-Mails (Spam folder
                      included) for a confirmation E-Mail or send another
                      confirmation E-Mail.
                    </p>
                    <button
                      type="button"
                      onClick={this.onSendEmailVerification}
                      disabled={this.state.isSent}
                    >
                      Send confirmation E-Mail
                    </button>
                  </>
                )}
              </div>
            ) : (
              <Component {...this.props} />
            )
          }
        </SessionContext.Consumer>
      );
    }
  }

  return withFirebase(WithEmailVerification);
};

export default withEmailVerification;

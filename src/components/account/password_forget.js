import React, { Component } from 'react';
import { withFirebaseConsumer } from '../firebase/index';

const INITIAL_STATE = {
  email: '',
  error: null,
};
class PasswordForgetFormBase extends Component {
  state = {
    ...INITIAL_STATE,
  };

  onChange = e => {
    this.setState({
      email: e.currentTarget.value,
    });
  };

  onSubmit = e => {
    if (!this.state.error) {
      this.props.firebase
        .doPasswordReset(this.state.email)
        .then(() => {
          this.setState({ ...INITIAL_STATE });
        })
        .catch(error => {
          this.setState({
            error,
          });
        });
      e.preventDefault();
    }
  };

  render() {
    const { email, error } = this.state;
    const isInvalid = email === '';
    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="email"
          placeholder="Email Address"
        />
        <button disabled={isInvalid} type="submit">
          Email My Password
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const PasswordForgetForm = withFirebaseConsumer(PasswordForgetFormBase);

export default PasswordForgetForm;

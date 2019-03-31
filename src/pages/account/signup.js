import React, { Component, Fragment } from 'react';
import Layout from '../../components/layout';
import { Link, navigate } from 'gatsby';
import * as ROUTES from '../../constants/routes';
import withFirebase from '../../components/firebase/with_firebase';
import { StyledForm, Label, Input, FormField } from '../../styles';

const SignUpPage = () => (
  <Layout>
    <SignUpForm />
  </Layout>
);

const INITIAL_STATE = {
  displayName: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  error: null,
};
class SignUpFormBase extends Component {
  state = {
    ...INITIAL_STATE,
  };

  onSubmit = event => {
    const { displayName, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        navigate(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <StyledForm onSubmit={this.onSubmit}>
        <FormField>
          <Label htmlFor="username">Full Name</Label>
          <Input
            name="username"
            value={username}
            onChange={this.onChange}
            type="text"
            id="username"
          />
        </FormField>
        <FormField>
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            id="email"
            value={email}
            onChange={this.onChange}
            type="email"
            placeholder="Email Address"
          />
        </FormField>
        <FormField>
          <Label htmlFor="passwordOne">Password</Label>
          <Input
            id="passwordOne"
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
        </FormField>
        <FormField>
          <Label htmlFor="passwordTwo">Password (again)</Label>
          <Input
            id="passwordTwo"
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder="Confirm Password"
          />
        </FormField>
        <button type="submit" disabled={isInvalid}>
          Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </StyledForm>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = withFirebase(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };

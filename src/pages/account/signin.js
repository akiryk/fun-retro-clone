import React, { Component } from 'react';
import { SignUpLink } from './signup';
import { navigate } from 'gatsby';
import Layout from '../../components/layout';
import { StyledForm, Label, Input, FormField } from '../../styles';
import withFirebase from '../../components/firebase/with_firebase';
import { Link } from 'gatsby';
import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
  <Layout>
    <h1>SignIn</h1>
    <SignInForm />
    <SignUpLink />
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </Layout>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  state = {
    ...INITIAL_STATE,
  };

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
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
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';

    return (
      <StyledForm onSubmit={this.onSubmit}>
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
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
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

const SignInForm = withFirebase(SignInFormBase);

export default SignInPage;

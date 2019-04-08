import React, { Component } from 'react';
import withFirebaseConsumer from '../../components/firebase/with_firebase_consumer';

class Story extends Component {
  state = {
    loading: false,
    author: '',
    title: '',
  };

  componentDidMount() {
    this.setState({ loading: true });
    const { id } = this.props;
    this.props.firebase
      .story(id)
      .get()
      .then(doc => {
        const { author, title } = doc.data();
        this.setState({
          loading: false,
          author,
          title,
        });
      });
  }

  componentWillUnmount() {}

  render() {
    return (
      <>
        {this.state.loading ? (
          <p>Loading...</p>
        ) : (
          <section>
            <h1>{this.state.title}</h1>
            <p>By {this.state.author}</p>
          </section>
        )}
      </>
    );
  }
}
export default withFirebaseConsumer(Story);

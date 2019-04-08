import React from 'react';
import * as ROUTES from '../../constants/routes';
import { Link } from 'gatsby';
import { Match } from '@reach/router';
import Story from './story';
import Layout from '../../components/layout';
import withFirebaseConsumer from '../../components/firebase/with_firebase_consumer';

const StoryList = ({ stories }) => (
  <ul>
    {stories.map(story => (
      <li key={story.id}>
        <Link to={`${ROUTES.STORIES}/${story.id}`}>{story.title}</Link>
      </li>
    ))}
  </ul>
);
class StoryPageBase extends React.Component {
  state = {
    stories: null,
    loading: true,
  };

  componentDidMount() {
    if (this.state.stories) {
      return;
    }
    this.props.firebase
      .stories()
      .get()
      .then(querySnapshot => {
        const stories = querySnapshot.docs.map(doc => ({
          id: doc.id,
          title: doc.data().title,
        }));
        this.setState({ loading: false, stories });
      });
  }

  componentWillUnmount() {}

  render() {
    return (
      <>
        <h2>This is a stories list page</h2>
        {this.state.loading ? (
          <p>Loading...</p>
        ) : (
          <Match path={ROUTES.STORY}>
            {props =>
              props.match ? (
                <Story {...props.match} />
              ) : (
                <StoryList stories={this.state.stories} />
              )
            }
          </Match>
        )}
      </>
    );
  }
}

const StoryPageWithFirebase = withFirebaseConsumer(StoryPageBase);

const StoryPage = () => (
  <Layout>
    <StoryPageWithFirebase />
  </Layout>
);

export default StoryPage;

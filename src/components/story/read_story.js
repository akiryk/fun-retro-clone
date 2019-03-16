import React from "react";
import { getFirebase } from "../../firebase";

class ReadStory extends React.Component {
  state = {
    stories: [],
    showStory: false,
    story: {},
    chapter: {},
  };

  componentDidMount() {
    const lazyApp = import("firebase/app");
    const lazyFirestore = import("firebase/firestore");

    Promise.all([lazyApp, lazyFirestore]).then(([firebase]) => {
      this.database = getFirebase(firebase).firestore();
      this.database
        .collection("stories")
        .get()
        .then(querySnapshot => {
          const stories = querySnapshot.docs.map(doc => ({
            id: doc.id,
            chapter1: doc.data().first_chapter_id,
            title: doc.data().title,
            author: doc.data().author,
          }));
          this.setState({
            stories,
          });
        });
    });
  }

  showFirstChapter = story => {
    var docRef = this.database.collection("chapters").doc(story.chapter1);
    docRef.get().then(doc => {
      if (doc.exists) {
        console.log("Exists");
        const chapter = doc.data();
        this.setState({
          showStory: true,
          story,
          chapter,
        });
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        <h1>Stories</h1>
        <ul>
          {this.state.stories.map(story => {
            return (
              <li key={story.id}>
                <button
                  type="button"
                  onClick={() => {
                    this.showFirstChapter(story);
                  }}
                >
                  {story.title}
                </button>
              </li>
            );
          })}
        </ul>
        {this.state.showStory && (
          <React.Fragment>
            <h2>{this.state.story.title}</h2>
            <h3>{this.state.chapter.title}</h3>
            <p>{this.state.chapter.body}</p>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default ReadStory;

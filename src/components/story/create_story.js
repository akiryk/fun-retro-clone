import React from "react";
import { getFirebase } from "../../firebase";

class CreateStory extends React.Component {
  componentDidMount() {
    const lazyApp = import("firebase/app");
    const lazyFirestore = import("firebase/firestore");

    Promise.all([lazyApp, lazyFirestore]).then(([firebase]) => {
      this.database = getFirebase(firebase).firestore();
      this.database
        .collection("stories")
        .get()
        .then(querySnapshot => {
          const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            title: doc.data().title,
          }));
          console.log(data);
        });
    });
  }

  state = {
    title: "",
    author: "",
    storyId: null,
    chapterTitle: "",
    body: "",
  };

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  onCreateStory = evt => {
    evt.preventDefault();
    this.database
      .collection("stories")
      .add({
        title: this.state.title,
        author: this.state.author,
      })
      .then(docRef => {
        if (docRef && docRef.id) {
          this.setState({ storyId: docRef.id });
        } else {
          throw new Error("No document reference ID");
        }
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  };

  onCreateChapter = evt => {
    evt.preventDefault();
    this.database
      .collection("chapters")
      .add({
        title: this.state.chapterTitle,
        body: this.state.body,
        belongsTo: this.state.storyId,
      })
      .then(docRef => {
        if (docRef && docRef.id) {
          this.setState({
            chapterId: docRef.id,
          });
          this.handleUpdateStoryFirstChapter(this.state.storyId, docRef.id);
        }
      });
  };

  handleUpdateStoryFirstChapter = (storyId, firstChapterId) => {
    this.database
      .collection("stories")
      .doc(storyId)
      .update({
        first_chapter_id: firstChapterId,
      })
      .then(() => {
        // success!
        alert("Success!");
      });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.storyId === null ? (
          <form onSubmit={this.onCreateStory}>
            <label htmlFor="title">Story Title: </label>
            <input
              id="title"
              type="text"
              name="title"
              onChange={this.handleChange}
            />
            <label htmlFor="author">Story Author: </label>
            <input
              id="author"
              type="text"
              name="author"
              onChange={this.handleChange}
            />
            <button>Submit</button>
          </form>
        ) : (
          <form onSubmit={this.onCreateChapter}>
            <label htmlFor="chapterTitle">Chapter Title: </label>
            <input
              id="chapterTitle"
              type="text"
              name="chapterTitle"
              onChange={this.handleChange}
            />
            <label htmlFor="body">Chapter text: </label>
            <input
              id="body"
              type="text"
              name="body"
              onChange={this.handleChange}
            />
            <button>Submit</button>
          </form>
        )}
      </React.Fragment>
    );
  }
}

export default CreateStory;

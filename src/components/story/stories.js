import React from "react"
import { getFirebase } from "../firebase"

class Stories extends React.Component {
  componentDidMount() {
    const lazyApp = import("firebase/app")
    const lazyFirestore = import("firebase/firestore")

    Promise.all([lazyApp, lazyFirestore]).then(([firebase]) => {
      const database = getFirebase(firebase).firestore()
      console.log("Stories:")

      database
        .collection("stories")
        .get()
        .then(querySnapshot => {
          const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            title: doc.data().title,
          }))
          console.log(data)
        })
    })
  }

  render() {
    return <h1>Hello Stories</h1>
  }
}

export default Stories
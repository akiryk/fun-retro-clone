# Gatsby and Firebase

## Firebase Authentication

### Authentication
Firebase is imported and initialized in a standard es6 class in `src/context/firebase_context`.
It's then made available to the entire app via a Provider in `gatsby-browser`, which wraps everything (see [gatsby docs](https://www.gatsbyjs.org/blog/2019-01-31-using-react-context-api-with-gatsby/)).

Firebase can now be consumed anywhere in the app using `<FirebaseContext.Consumer>` — to simplify development, use the `withFirebaseConsumer` HOC, as in `withFirebaseConsumer(SomeComponent)`

### Session
Session information is also stored in React Context and is made available by a Provider using the `withSessionProvider`.
The session provider needs to have access to Firebase, so it's wrapped in a Firebase Consumer.

## Roles and Authorization
Roles are handled right now only in Admin. TBD: better organize code so it makes more sense. There is an awkward nesting of components so that Admin has access to the right context data for users.

## Sources
* [Unicorn Agency Polling App Tutorial](https://medium.com/@UnicornAgency/jamstack-pwa-lets-build-a-polling-app-with-gatsby-js-firebase-and-styled-components-pt-2-9044534ea6bc )

## Plugins
Gatsby does not support dynamically generated pages, meaning you can't have routes like `/users/:someId`. In order to accomplish this we need to add a plugin that will have Gatsby skip generating the markup for a specified route, effectively making that route’s page component behave like a single page application.

```
// First, install the plugin
npm install gatsby-plugin-create-client-paths

// Then update gatsby-config
{
  resolve: `gatsby-plugin-create-client-paths`,
  options: { prefixes: [`/admin/*`, `/stories/*`] },
},
```

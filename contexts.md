# Context

In React the state lives inside a component but in some cases you have some
values that should be shared across the whole application. The logged user is
one example. Others could be feature flags `history`, `location` and locale
information. Everywhere in your app you know that these things exist and you
need an easy way to access them.

You could put these values in the root component `<App>` and pass them down with
props. This often means drilling a prop several layers. What's worse, often
times the components in between don't care about that particular value, they
only "carry it over".

React 16.3 introduced a new [context API](https://reactjs.org/docs/context.html)
that we can leverage exactly for this.

That's how you would handle the currently logged in user:

```jsx
// @flow
import { createContext } from 'react'
export default createContext()
```

```jsx
// @flow
import React from 'react'
import CurrentUserContext from 'contexts/CurrentUserContext'
import CurrentUserState from 'states/CurrentUserState'

function App() {
  return (
    <CurrentUserState>
      {currentUser => (
        <CurrentUserContext.Provider value={currentUser}>
          {/* rest of App goes here */}
        </CurrentUserContext.Provider>
      )}
    </CurrentUserState>
  )
}
```

We simply crate a new context and we export it. `App` is in charge of changing
its value. Now everywhere we need the current user we can leverage render props:

```jsx
// @flow
import React from 'react'
import { CurrentUserContext } from 'contexts/CurrentUserContext'

function AppHeader() {
  return (
    <CurrentUserContext.Consumer>
      {currentUser => <div>Welcome back {currentUser.firstName}</div>}
    </CurrentUserContext.Consumer>
  )
}
```

## Context vs State

If you think that context and state components are similar you are absolutely
right. They both hold data and they make it available via render props. There is
although a big difference. Context is global, meaning that the same value will
be available to your component and its descendants. State, on the other hand,
gets initialized for every component you use.

This is quite important. Importing the same state container in two different
components won't allow them to share the state, it will only create two copies
of the state that will go out of sync as soon as one gets modified.

If you need two or more components to share the state you can—as usual in
React—move it to a parent component.

## Local and Global Context

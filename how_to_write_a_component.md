# How to Write a Component

There are three main kind of components you're going to work with:
Presentational, State and Containers.

## Presentational Components

Presentational components are the easiest kind and they usually make up 90% of
your application. Ideally all they do is to render something based only of the
value of their `props`. In practice they might have a small internal state.
What's important is that no business logic lives in these components, including
communication with the backend.

The easiest way to crate a presentational component is with
[`styled-components`](https://www.styled-components.com/):

```jsx
// @flow
import styled from 'styled-components'
import { type ComponentType } from 'react'

type Props = {| size: 'big' | 'small' |}

const Button: ComponetType<Props> = styled.button.attrs({ type: 'button' })`
  background: blue;
  width: ${props => (props.size === 'big' ? '100px' : '50px')};
`

Button.defaultProps = { size: 'big' }

export default Button
```

In many cases you will need to be able to render more than just
`props.children`. You can do that with a functional component:

```jsx
// @flow
import React from 'react'
import { type User } from 'types/users'

type Props = {| user: User, salute: 'Hello' | 'Hi' |}

function UserGreetings(props: Props) {
  return (
    <div>
      {props.salute}, {props.user.firstName} {props.user.lastName}
    </div>
  )
}

UserGreetings.defaultProps = { salute: 'Hello' }

export default UserGreetings
```

Note that a component doesn't have to return a tag, the example before could
have been written:

```jsx
function UserGreetings(props: Props) {
  return `${props.salute}, ${props.user.firstName} ${props.user.lastName}`
}
```

In some cases it makes sense for a presentational component to have an internal
state. In these cases create the component as a `class`:

```jsx
// @flow
import React, { Fragment } from 'react'

type Props = {| maxCharacters: number |}
type State = {| value: string |}

class App extends React.Component<Props, State> {
  state = { value: '' }

  handleChange = (evt: SyntheticInputEvent<HTMLTextAreaElement>) =>
    this.setState({ value: evt.currentTarget.value })

  render() {
    return (
      <Fragment>
        <textarea value={this.state.value} onChange={this.handleChange} />
        You still have {this.props.maxCharacters - this.state.value.length}
      </Fragment>
    )
  }
}

export default App
```

### Routing

In [React Router](https://reacttraining.com/react-router/) a route is defined by
rendering the `Route` component. Therefore presentational components are the
best place to put routing logic:

```jsx
// @flow
import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import SettingsIndex from 'app/settings'
import PaymentsSettings from 'app/settings/payments'
import InvoicesSettings from 'app/settings/invoices'
import SecuritySettings from 'app/settings/security'
import { type User } from 'types/users'

type Props = {| user: User |}

function Settings(props: Props) {
  return (
    <Switch>
      <SettingsIndex />

      <Route exact path="/settings/payments" component={PaymentsSettings} />

      <Route exact path="/settings/invoices" component={InvoicesSettings} />

      {user.isAdmin ? (
        <Route exact path="/settings/security" component={SecuritySettings} />
      ) : (
        <Redirect from="/settings/security" to="/404" />
      )}
    </Switch>
  )
}

export default Settings
```

Try to define only one level of the route hierarchy in one component. For
example, if you had a route `/settings/payments/expired` you would define it in
`PaymentsSettings` and not in `Settings`. This helps keeping components small.

## State Components

## Container Components

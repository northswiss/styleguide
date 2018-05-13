# State Components

State components is where the business logic is. They hold the state of the
application and handle all the side effects (server interaction,
`localStorage`...).

State components are implemented withe the
[render prop](https://reactjs.org/docs/render-props.html) pattern.

## Render Props

First, a brief recap of what render props are.

```jsx
function DoubleComponent(props) {
  const double = this.props.value * 2
  return props.render( double )
}

// The following will render <div>10</div>
;<DoubleComponent value={5} render={ double  => <div>{double}</div>} />
```

So, a render property is just a prop that happens to be a function that returns
a [`Node`](https://flow.org/en/docs/react/types/#toc-react-node). Of course, the prop doesn't have to be called
`render`. As a matter of fact, if we name the prop `children` we can do some
neat things:

```jsx
function DoubleComponent(props) {
  const double = this.props.value * 2
  return props.children(double)
}

// The following will render <div>10</div>
;<DoubleComponent value={5}>{double => <div>{double}</div>}</DoubleComponent>
```

## Render Props for State Management

The render props patter can be extremely useful for state management.

Imagine we have a presentational component `TripsList` that renders a list of
trips. It should do three things:

1.  Show a loading state
2.  Show the list of trips
3.  Show an error state

Of course, it does only one of the three things depending on the state. In order
to accomplish its function `TripsList` needs to get a list of trips and a
status. The first solution that comes to mind is to pass these data via props.
This pattern is based on [container components](container_components.md) and is
now deprecated. A much better solution is provided by state components.

Here is how a state component for our problem would look like:

```jsx
// @flow
import React, { type Node } from 'react'
import { getTrips } from 'api/trips'
import { type Trip } from 'types/trips'

type State = {|
  status: 'INIT' | 'LOADING' | 'ERROR' | 'READY',
  trips: ?Array<Trip>,
|}
type Props = {| children: State => Node |}

class TripsState extends React.Component<Props, State> {
  state = { status: 'INIT' }

  async componentDidMount() {
    try {
      this.setState({ status: 'LOADING' })
      const trips = await getTrips()
      this.setState({ status: 'READY', trips })
    } catch (e) {
      this.setState({ status: 'ERROR' })
    }
  }

  render() {
    return this.props.children(this.state)
  }
}

export default TripsState
```

This component provides all the information `TripsList` needs. Note that we're
passing the whole state to `children` but we don't have to do that. In some
cases you only want to pass a subset of the state.

Let's see how we can use `TripsState`:

```jsx
// @flow
import React, { Fragment } from 'react'
import TripsState from './states/TripsState'
import TripItem from './TripItem'

function TripsList() {
  return (
    <Fragment>
      <h1>These are your trips</h1>
      <TripsState>
        {({ status, trips }) => {
          switch (status) {
            case 'INIT':
            case 'LOADING':
              return 'Loading...'
            case 'READY':
              return props.trips.map(trip => (
                <TripItem key={trip.id} trip={trip} />
              ))
            case 'ERROR':
            default:
              return 'Something went wrong'
          }
        }}
      </TripsState>
    </Fragment>
  )
}

export default TripsList
```

One important thing to notice is that the `<h1>` portion will render only once,
the rest of the page instead will re-render every time the sate of `TripsState`
changes.

What if we want to modify the sate? For example we might want to realod the trip
list when the user clicks on a button. For this `TripsState` can expose some
event handlers:

```jsx
// @flow
import React, { type Node } from 'react'
import { getTrips } from 'api/trips'
import { type Trip } from 'types/trips'

type State = {|
  status: 'INIT' | 'LOADING' | 'ERROR' | 'READY',
  trips: ?Array<Trip>,
|}
type Props = {| children: (State & { onRefreshTrips: () => void }) => Node |}

class TripsState extends React.Component<Props, State> {
  state = { status: 'INIT' }

  componentDidMount() {
    this.loadTrips()
  }

  loadTrips = async () => {
    try {
      this.setState({ status: 'LOADING' })
      const trips = await getTrips()
      this.setState({ status: 'READY', trips })
    } catch (e) {
      this.setState({ status: 'ERROR' })
    }
  }

  handleRefreshTrips = () => {
    this.loadTrips()
  }

  render() {
    return this.props.children({
      ...this.state,
      onRefreshTrips: this.handleRefreshTrips,
    })
  }
}

export default TripsState
```

In the same way we could have exposed an `onCreateTrip` method etc.

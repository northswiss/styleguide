# How to test your application

> "Testing can show the presence of errors, but not their absence." — E.W.
> Dijkstra

## Why we test

The role of tests is to give developers confidence in their implementation.
Confidence it's not to be confused with certainty. There will always be bugs
that your tests didn't cover but at least you'll be 99.9% confident that when a
user clicks on "Pay now" the app doesn't blow up.

Following this principle if you write a test that doesn't give you confidence
you should stop and think how to improve it. Take the following example:

```jsx
describe('<Button>', () => {
  it('should render', () => {
    const wrapper = shallow(<Button>Hello</Button>)
    expect(wrapper).toMatchSnapshot()
  })
})
```

Does it give you confidence? Sure it checks that at least the component renders
but it doesn't test what gets rendered. For all you know the `Button` component
might be rendering `null`.

## How to test

There are different kind of tests that apply to different contexts but in
general we can distinguish three main categories: unit tests, integration tests
and end-to-end test (sometimes called E2E or functional tests).

E2E are the most exhaustive because they test your application running in a
browser and performing real network calls. For this reason they're also the
slowest to run and the hardest to implement.

Integration tests are in the middle, they test that various components interact
correctly with each other but they run in a simulated DOM environment. They are
faster than E2E but not as fast as unit tests.

Last, unit tests, they run fast and they are easy to write but they only check a
tiny portion of your app. For example they test if a button can be clicked. They
don't check what happens after the button has been clicked though.

In general, you should strive to have as many integration tests as possible
because they give a good balance between effort and confidence. E2E should test
at least your happy paths, or the most common interactions your users have with
the app. Unit test are a great help when you're developing, especially if you
practice TDD.

## The black box principle

Consider this test:

```jsx
describe('<NewUserProfile>', () => {
  it('should create a new user when handleUserCreation is called', async () => {
    const wrapper = shallow(<NewUserProfile />)
    wrapper.setState({ email: 'new-user@gmail.com' })
    await wrapper.instance().handleUserCreation()
    expect(createUserMock).toHaveBeenCalledTimes(1)
    expect(createUserMock).toHaveBeenCalledWith({ email: 'new-user@gmail.com' })
  })
})
```

This test has two big problems. Firs it's testing the instance method
`handleUserCreation`, second that method is returning a `Promise` so that it can
be tested. Nothing in this test is making sure that `handleUserCreation` is
actually called at some point. Nothing makes sure that other part of
`NewUserProfile` or its children don't crash while we create a user.

This kind of testing is called white-box testing. It means that the developer
knows how the program is implemented and tests accordingly. A better way to
test—but also harder—is black-box testing. In this case the developer doesn't
know the implementation and can only provide inputs to the system and analyze
the outputs.

> "The more your tests resemble the way your software is used, the more
> confidence they can give you." —
> [Kent C. Dodds](https://twitter.com/kentcdodds/status/977018512689455106)

In a web application an input could be anything that the user does: clicking on
a button, resizing the window etc. An output is represented by what's rendered
on the screen but also what network requests get performed, the content of
`localStorage` etc.

If we want to adopt a black-box testing approach it's advisable not to use
[enzyme](http://airbnb.io/enzyme/) because it provides too many methods built to
test a component's implementation—`setState`, `instance`, etc.

A library that is black-box driven is
[`react-testing-library`](https://github.com/kentcdodds/react-testing-library).
Let's see how we could have implemented the previous test using it:

```jsx
describe('<NewUserProfile>', () => {
  it('should allow to create a new user', async () => {
    const { getByLabel, getByText } = renderIntoDocument(<NewUserProfile />)
    const emailInput = getByLabel('Email')
    emailInput.value = 'new-user@gmail.com'
    fireEvent.change(emailInput)

    const user = Fabricate('user', { email: 'new-user@gmail.com' })
    mockGet(user)
    fireEvent.click(getByText('Create User'))
    await waitForElement(() => getByText('User new-user@gmail.com created!'))
  })
})
```

This test is better than the previous one for several reasons. It's not
testing if a user gets created by a particular method, it's testing the whole
interaction a real user would have with the application. First it enters the
value in an input field, then clicks on a button and lastly it checks that the
page changed accordingly.

If some of the children fails it will fail too. But if the internal workings of
`NewUserProfile` changes—maybe because of a refactor—the test will still work
granted that the interface the user sees remains the same.

The previous test would have failed if we renamed `handleUserCreation`, this one
doesn't even know the method exists in the first place.

If for some reason we don't call `handleUserCreation` on click this test will
fail, the previous one didn't even know about the button.

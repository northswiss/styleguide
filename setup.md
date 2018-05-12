# How to Setup a Project

Create you React projects using
[`create-react-app`](https://github.com/facebookincubator/create-react-app) this
will give you a solid starting point and free upgrades. Don't
[eject](https://github.com/facebookincubator/create-react-app#converting-to-a-custom-setup)
unless you have a very good reason for doing so. If you want to eject check with
the rest of the team first.

## Additional Tools

Once you have your project setup with `create-react-app`, you will still need
some extra configuration.

### Node.js and npm

Make sure you specify your [Node.js](https://nodejs.org) version in an `.nvmrc`
file for [`nvm`](https://github.com/creationix/nvm) users.

Try to use [`npm`](https://www.npmjs.com) over
[`yarn`](https://yarnpkg.com/lang/en). They are both great package managers but
keeping the same version of `npm` among the whole team is easier since it's
bound to Node.js's version.

### Flow

We try to type-check all our JavaScript files using [Flow](https://flow.org). To
install Flow, you can simply follow the
[installation guide](https://flow.org/en/docs/install).

It's important that you execute
[`flow-typed`](https://github.com/flowtype/flow-typed) after you setup Flow and
every time you install, remove or update a node module.

### Prettier

Instead of having an extensive style guide dissecting where to put every white
space we prefer to use [Prettier](https://github.com/prettier/prettier) for
automatic code formatting.

This is our `prettierrc.js` file:

```js
module.exports = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  trailingComma: 'es5',
  bracketSpacing: true,
  jsxBracketSameLine: false,
  arrowParens: 'avoid',
  parser: 'flow',
}
```

Make sure you follow the
[official documentation](https://github.com/prettier/prettier#pre-commit-hook)
so that Prettier runs automatically for every new commit.

### Codeship

**TBD**

### Others

If you are on a Mac, Jest watch mode might not be working for you. You can fix
it by installing or upgrading
[watchman](https://github.com/facebook/jest/issues/1767#issuecomment-248883102).

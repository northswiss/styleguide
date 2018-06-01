# Code Style

As said we leave code formatting to Prettier, there are also some
[ESLint](http://eslint.org) rules that are automatically set by Create React
App.

At the time of writing it is not possible to configure custom ESLint rules
without ejecting from Create React App. But it's possible to add a second eslint
check and run it separately in CI.

Here are some advices on how to write JavaScript code so that is more readable.

- Prefer `const` over `let`. Code written with constants is often more readable
- Never use comments to describe what your program is doing. The code should be
  easy to read and understand. Comments are a useful tool to explain _why_ you
  wrote a portion of your program in a certain way but not to clarify what's
  going on in the program. Even worse, if you update your code the comments no
  longer describe your logic. Consider the following examples.

      	```js
      	// Bad example
      	// Returns true if the user can book
      	// false otherwise
      	function bookHelper(user) {
      		// If the user is at least 18 years old
      		// And the user is admin OR internal
      		if (user.birthday.slice('-')[0] < new Date().getFullYear() - 18 && ['admin', 'internal'].includes(user.role)) {
      			return true
      		}
      		return false
      	}

      	// Good example
      	function canUserBookTrip(user) {
      		const isUserAtLeast18 = user.birthday.slice('-') < new Date().getFullYear - 1
      		const isUserInternal = user.role === 'internal'
      		const isUserAdmin = user.role === 'admin'
      		return isUserAtLeast18 && (isUserInternal || isUserAdmin)
      	}

      	// Better example, with Flow annotations
      	type CanUserBookTrip: User => boolean
      	function canUserBookTrip(user): CanUserBookTrip {
      		const isUserAtLeast18 = user.birthday.slice('-') < new Date().getFullYear - 1
      		const isUserInternal = user.role === 'internal'
      		const isUserAdmin = user.role === 'admin'
      		return isUserAtLeast18 && (isUserInternal || isUserAdmin)
      	}
      	```

- Learn `Array` methods, in particular
  [`filter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter),
  [`find`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find),
  [`includes`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes),
  [`map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map),
  [`forEach`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach),
  [`reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce),
  [`some`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
  and
  [`every`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every).
  With these methods you'll be able to get rid of loop statements 90% of the
  time and make your code more expressive.

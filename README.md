# jlafer-flex-util

This is a library of utility functions for use in Twilio Flex development.

## Installation

npm install --save jlafer-flex-util

## Miscellaneous Functions

### formatPhoneNum(phoneNumber)
```
formatPhoneNum :: string -> string
```
```javascript
  formatPhoneNum('8005551212'); // (800) 555-1212
```

## Testing
As this package is designed for building library packages, the suggested (i.e., TDD) development pattern would involve putting functions and their test cases in the package and testing locally. `Jest` is already included and can be invoked using `npm test`. The `babel-jest` package is installed along with a `babel.config.js` file, so Jest automatically transpiles ES6-style test files prior to execution. See `src/index.test.js` for a sample test case file.

## Local Usage
During active development you can also use the `npm run dev` command to run Rollup in "watch" mode - the executable packages are updated as changes are saved to the source files. So, for instance, if you put calling code in `index.js` you could run it in NodeJS using the command `node dist/bundle.cjs.js`.

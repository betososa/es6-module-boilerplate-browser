# es6-module-boilerplate-browser
bundled and tested es6 module development and distribution boilerplate for the web/html/browser

## features
- es6 syntax and features, using browserify transform babelify (with sourcemaps for development)
- bundling, using browserify
- unit testing, using your browser, mocha & chai
- in-browser coverage information powered by Blanket.JS

## how to start
```sh
$ git clone https://github.com/elgubenis/es6-module-boilerplate-browser
$ cd es6-module-boilerplate-browser/
$ npm install
$ gulp
```
Now modify the source in src/ or modify the tests in test/spec/ and your browser should
reload automatically and run the tests and show coverage information.
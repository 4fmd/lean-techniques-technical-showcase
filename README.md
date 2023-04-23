
- [Lean Techniques Photo Album Technical Showcase](#lean-techniques-photo-album-technical-showcase)
	- [Overview](#overview)
	- [Dependencies](#dependencies)
	- [Development Environment](#development-environment)
		- [Building for Development](#building-for-development)
		- [`npm` vs `yarn`](#npm-vs-yarn)
			- [`npm`](#npm)
			- [`yarn`](#yarn)
		- [Building for Production](#building-for-production)
			- [`npm`](#npm-1)
			- [`yarn`](#yarn-1)

## Lean Techniques Photo Album Technical Showcase

This project provides a solution to a technical showcase problem posed by [Lean Techniques](https://leantechniques.com/).

### Overview

This project provides a solution to the showcase problem using [React](https://react.dev/).

### Dependencies

Development of this projects makes use of the following dependencies:

| Dependency | Version |
| ---------- | ------- |
| node.js | 18.16.0 |
| npm | 9.5.1 |
| yarn | 1.22.19 |
| React | 18.2 |
| Axios | 1.3.5 |
| SASS | 1.62 |

For a detailed listing of the JavaScript libraries see [`package.json`](package.json).

### Development Environment

This project was written using [Visual Studio Code](https://code.visualstudio.com/) on [Ubuntu 22.04 LTS](https://ubuntu.com/download/desktop).

Development on this project has **NOT** been tested on Windows or macOS.

#### Building for Development

Development for this project can be done using either `npm` or `yarn`.

#### `npm` vs `yarn`

Both `npm` and `yarn` were used during the development of this project.  Continued development can use either or decide to use only one.

Since both package managers were used `package-lock.json` and `yarn.lock` files are included.

When switching between package managers it is recommended to clear their cache, remove the lock files, and perform an install.

**Remember to stop the React development server first!**

Issue these commands when switching package managers:

```shell
$ rm -f package-lock.json yarn.lock
```

If changing to `npm`:

```shell
$ npm cache clean --force
$ npm install
```

If changing to `yarn`:

```shell
$ yarn cache clean
$ yarn install
```



##### `npm`

To develop using the `npm` package manager execute the following commands from a terminal window in the root directory of the project.

```shell
$ npm install
```

```shell
$ npm start
```
##### `yarn`

To develop using the `npm` package manager execute the following commands from a terminal window in the root directory of the project.

```shell
$ yarn install
```

```shell
$ yarn start
```

Once the project has been built and is ready for development, the default system browser will open to `http://localhost:3000` and the project will be opened.

#### Building for Production

Building a production version of this project can be done using either `npm` or `yarn`.

**Before executing the build commands stop the React development server!**

##### `npm`

To build using the `npm` package manager execute the following commands from a terminal window in the root directory of the project.

```shell
$ npm build
```

##### `yarn`

To build using the `yarn` package manager execute the following commands from a terminal window in the root directory of the project.

```shell
$ yarn build
```
# Welcome to wakra-project 👋

> Typescript React + Node

## Install

Apps required (skip if already installed in your workstation)

1. [NodeJS](https://nodejs.org/en/)
2. [Git Bash](https://git-scm.com/downloads)
3. [Hyper](https://hyper.is/) (Optional)
4. Python from Microsoft Store
5. [Visual Studio Build Tools](https://github.com/nodejs/node-gyp#on-windows)
6. Install lerna

```sh
yarn add global lerna
```

7. on root folder run to install packages:

```sh
yarn bootstrap
```

8. on root folder run to install packages:

```sh
yarn start
```

9. (Optional) On VSCode. install the following extensions:

   - Prettier
   - ESLint

## Branch naming and commit message (MUST FOLLOW)

Types

- feat - new/additional features.
- fix - improvement/bug fix on existing features.
- tech - refactor code, etc.

# Branch naming

```sh
<type>/<title>
```

Ex.

```
feat/dashboard
feat/login
fix/dashboard
fix/login
fix/login-performance
tech/user-input
```

# Commit messages

To easily generate changelog we must follow branch naming as per below:

```sh
<type>(<title>): <Description>
```

Ex.

```
// new features
feat(dashboard): improved UI.
feat(login): added login UI.

// bug fixing
fix(dashboard): Bug fix.
fix(login): improve performance login.

// refactor or etc.
tech(user-input): refactor debounce.
```

## Packages guide

Path

```
wakra-project/packages/
```

- backend
  - Backend server for wakra-project
- frontend
  - Frontend UI for wakra-project
- common
  - Shared types between backend and frontend. Mostly used to API response data types.

## Usage

```sh
yarn start
```

## Author

- Website: https://github.com/rem029
- Github: [@rem029](https://github.com/rem029)

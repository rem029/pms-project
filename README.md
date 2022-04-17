# Welcome to wakra-project 👋

> ReactTS + NodeTS

## Install

Apps required (skip if already installed in your workstation)

1. [NodeJS](https://nodejs.org/en/)
2. [Git Bash](https://git-scm.com/downloads)
3. [Hyper](https://hyper.is/) (Optional)
4. Python from Microsoft Store
5. [Visual Studio Build Tools](https://github.com/nodejs/node-gyp#on-windows)
6. Install lerna

```sh
npm -g i lerna
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

## Branch naming (MUST FOLLOW)

To easily generate changelog we must follow branch naming as per below:

```sh
<feature | fix | tech>(<title>): <Description>
```

- feature - new/additional features.
- fix - improvement/bug fix on existing features.
- tech - refactor code, etc.

Ex.

```
// new features
feature(dashboard): improved UI.
feature(login): added login UI.

// bug fixing
fix(dashboard): Bug fix.
fix(login): improve performance login.

// refactor or etc.
tech(user-input): refactor debounce.
```

## Usage

```sh
yarn start
```

## Author

- Website: https://github.com/rem029
- Github: [@rem029](https://github.com/rem029)

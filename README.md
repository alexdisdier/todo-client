[![Build Status](https://semaphoreci.com/api/v1/alexdisdier/todo-client/branches/master/shields_badge.svg)](https://semaphoreci.com/alexdisdier/todo-client)
[![codecov](https://codecov.io/gh/alexdisdier/todo-client/branch/master/graph/badge.svg)](https://codecov.io/gh/alexdisdier/todo-client)

<p align="center" >
   <a href="https://alexdisdier.github.io/todo-client/">
    <img alt="todo list alex disdier" src="https://res.cloudinary.com/dvrkxmxkw/image/upload/v1552160814/github-screenshot-gif/todo-list.gif" width="342" height="527" />
 </a>

</p>

# Synopsis

This is a to do list Web Application built with React.

You will find two branches:

- **master** using Typescript (converted initial javascript project), propTypes and a "loading" Higher Order Component.
- **initial-js** first version of this project

## Usage example

See demo - https://alexdisdier.github.io/todo-client/

## ✅ Functionalities

- Add a task
- Cross out a task which goes automatically at the end of the list
- Drag and drop client side.
- Delete a task
- Saved to a database (mLab) via Heroku
- Loading and error component

## Running the project

Clone this repository :

```bash
git clone https://github.com/alexdisdier/todo-client.git

cd todo-client
```

Start the server:

```bash
npm start
```

Run Jest testing:

```bash
npm test
```

Build the project

```bash
npm run build
```

Codecov set up:
https://github.com/settings/installations/1865753

Check validity of codecov.yml file

```bash
cat codecov.yml | curl --data-binary @- https://codecov.io/validate
```

Make sure in Semaphoreci, we're using the right node version to run a build. 

## Built With

- html
- css
- [JavaScript](https://developer.mozilla.org/bm/docs/Web/JavaScript)
- [TypeScript](https://developer.mozilla.org/bm/docs/Web/TypeScript)
- [React.js](https://reactjs.org/docs/hello-world.html)
- [Create React App](https://facebook.github.io/create-react-app/docs/getting-started)

## Dependencies

- [axios](https://www.npmjs.com/package/axios)

## Acknowledgments

- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- Deploy React to github pages [codeburst](https://codeburst.io/deploy-react-to-github-pages-to-create-an-amazing-website-42d8b09cd4d)
- I used a headstart dragAndDrop tutorial by _Temitope Emmanuel_ [Medium](https://medium.com/the-andela-way/react-drag-and-drop-7411d14894b9)

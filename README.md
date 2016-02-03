# ThinkingInReact.xyz

This is the source for [ThinkingInReact.xyz](https://www.ThinkingInReact.xyz). Codebase is a bit messy so it is suggested that you not use this as a boilerplate for now at least. Feel free to rip out any code you like though and use it in your projects.

## How it works

## Installation

First rename `.env_example` to .env and change the values to your own.

Then install the dependencies:

```sh
$ npm install .
```

## Running a local dev server

Run:

```sh
$ npm run start:dev
```

This will boot up webpack and webpack-dev-middleware and manage it through node-foreman

## Deploying

There are two steps;

1. Make sure you environment has the correct environment variables (look to env for this)
2. Compile the server using `$ npm run dist && npm run webpack:server`
3. Finally run it

```sh
$ node server.js
```

## Deploying using Modulus.io

If you are on modulus you can just run the following:

```sh
$ npm run deploy
```

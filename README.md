# chat-app
[![Build Status](https://travis-ci.org/chat-sggw/app.svg?branch=master)](https://travis-ci.org/chat-sggw/app)

> Chat application with geolocation

### For developers

#### Prerequisites
* [Node](https://nodejs.org) 8 LTS (carbon)
* [yarn](https://yarnpkg.com/lang/en/docs/install/) v1.x.x
* IDE with [EditorConfig](http://editorconfig.org/) support
* `yarn` to install project dependencies

#### Building
Web
* `yarn dev:web` to build & run application in developer mode
* `yarn build:web` to build application to `./dist/web`

PC
* `yarn dev:pc` to build & run application in developer mode
* `yarn build:pc` to build application to `./dist/electron`
* `yarn pack` to generate installable executable in `./build`

### Dyskusje
* [app-devs](https://github.com/orgs/chat-sggw/teams/app-devs) - przydatne linki
* Pull Request
  * przy zmianie graficznej należy dodać zrzut ekranu w komentarzu i jako recenzenta dodać grupę `design`

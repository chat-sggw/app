# chat-app
[![Build Status](https://travis-ci.org/chat-sggw/app.svg?branch=master)](https://travis-ci.org/chat-sggw/app)
[![Build status](https://ci.appveyor.com/api/projects/status/n43sjorssy73dfbn/branch/master?svg=true)](https://ci.appveyor.com/project/kacpak/app/branch/master)

> Chat application with geolocation

### For developers

#### Prerequisites
* Node 8 LTS (carbon)
* yarn v1.x.x
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

# construx-sass

Lead Maintainer: [Matt Edelman](https://github.com/grawk)

[![Build Status](https://travis-ci.org/krakenjs/construx-sass.svg?branch=master)](https://travis-ci.org/krakenjs/construx-sass)
[![NPM version](https://badge.fury.io/js/construx-sass.png)](http://badge.fury.io/js/construx-sass)

[construx](https://github.com/krakenjs/construx) plugin for JIT-compiling sass resources during development of [express](http://expressjs.com/) applications.


## Usage

### Install

```shell
$ npm install --save-dev construx-sass
```

### Configure

Where you configure your construx plugins:

```json
"css": {
    "module": "construx-sass",
    "files": "/css/**/*.css"
},
```

_Note: See [construx README](https://github.com/krakenjs/construx/blob/master/README.md) for general usage of construx_


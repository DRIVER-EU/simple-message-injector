# simple-message-injector

Inject a simple message into the Apache Kafka Test-bed.

The current project is intended to let others know via the DRIVER+ Test-bed that a large file has been uploaded to an FTP site.

## Installation

Assuming you have installed a recent version (v8+) of [Node](http://nodejs.org), run `npm i -g simple-message-injector` to install the application.

## Run

After installation, you can run `simple-message-injector --help` to see an overview of available commands. Most likely, running `simple-message-injector` is sufficient, after which you can find the web page at [http://localhost:8456](http://localhost:8456), but you can also specify the port, Kafka broker and schema registry, if required.

## Build

Assuming you have installed [Lerna](https://lernajs.io), run `npm run install` to install all dependencies. The repository is split in two packages, a GUI based on the [progressive JavaScript framework Vue](https://vuejs.org), and a server based on [Node](http://nodejs.org), both developed in TypeScript. You need to run `npm run serve` to build the server and GUI, and watch for file changes.

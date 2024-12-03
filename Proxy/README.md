# Proxy Server

Welcome to the Proxy Server! This project sets up a simple proxy server using Node.js that can be used to forward requests and responses between clients and backend servers. It can be useful for various purposes, such as load balancing, caching, and request modifications.

# Table of Contents

- [Features](#Features)
- [Getting Started](#Getting-Started)
- [Installation](#Installation)
- [Usage](#Usage)
- [Configuration](#Configuration)
- [Making Requests](#Making-Requests) 

# Features

- Simple HTTP and HTTPS proxy
- Request and response logging
- Customizable request handling
- Support for multiple backend servers
- Lightweight and easy to deploy

# Getting Started 

To get it running, follow these simple steps.

## Prerequisites

- Node.js (>= 18.x)
- npm (Node package manager)

## Installation

1. Change directory into the project folder:

```sh

cd /Custom_Proxy

```

2. Install the dependencies:

```sh

npm install

```

## Usage


To start the proxy server, run:

```sh

npm start

```

By default, the server will listen on port `3000`. You can change the port in the configuration file.

## Configuration 

You can configure the proxy settings in the `src/app/config/config.ts` file. Here are some common settings:


```ts

{

  proxy: {

    port: 3000, // proxy port

    target: {

      url: "localhost", // target url

      port: 8080, // target port

    },

    ...

  }

}

```

Feel free to modify as you fit.


## Making Requests

You can now make requests to the proxy server. For example:

```sh

curl -X GET http://localhost:3000/your-endpoint

``` 

The proxy server will forward request to the specified backend server.

 

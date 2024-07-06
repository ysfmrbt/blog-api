# Hono.js + MongoDB on Node.js

## Description

This is a simple REST API using Hono.js, MongoDB on Node.js.

## Get started

### Add your MongoDB connection string

In `src/mongo.ts`:

``` typescript
const uri = 'mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority';
```

### Install dependencies and run the server

``` shell
npm install
npm run dev
```

## Test using your favorite HTTP client

### HTTPie

``` shell
http GET localhost:3000/posts
```

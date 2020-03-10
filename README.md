# SYNERGxDB Web App

## Setup Instructions

- Fork and clone this repo

```
git clone git@github.com/{yourUsername}/SYNERGxDB/.git
cd SYNERGxDB
```

- Create .env using .env.example as a reference to access the database

- Install all server dependencies `npm i`
  
- Start the server by running `npm start` or `npm run devstart`(development mode) command
  
- Install all client dependencies `cd client && npm i`

- Start the client (development mode) by running `npm start`
  
- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Build Instructions

- Go into clients directory `cd client`

- To build React app for production use `npm run build` command

## Dependencies

- React
- Styled-Components
- Styled-Normalize
- Plotly.js
- React-Dom
- React-Router
- React-plotly.js
- React-window
- Express
- Knex
- Dotenv
- Body-parser

## Dev Dependenices

- Nodemon
- Eslint

## Servers

- Production server: [http://SYNERGxDB.ca/](http://synergxdb.ca/)

## Database

A MySQL dump of pharmacological and molecular profiles of SYNERGxDB is available on [Zenodo](https://doi.org/10.5281/zenodo.3687222).

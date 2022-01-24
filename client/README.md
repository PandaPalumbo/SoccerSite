# Football Visuals

## Project setup
```
npm install
```
Make sure to run the endpoint server. 
1. Open `/data/endpoints` from the root in a terminal.
2. Run `npm i` on the ^ mentioned folder
3. Make a `.env` file with HOST, PW, USER, DB with your login information to the cloud sql.
4. In the `/data/endpoints/package.json` add `start: nodemon index.js`
5. Now run `npm start`, and the server should start and refresh any time you edit the endpoints in `index.js`
6. Now any route on `localhost:3000` can be hit like an API endpoint.  ex `localhost:3000/teams`

Also make sure to have a `.env` in the root folder to connect to API. `VUE_APP_USER ` and ` VUE_APP_TOKEN`

If you download `.env` from email or dropbox, the period infront will get removed. Make sure to add it back!
### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### 

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

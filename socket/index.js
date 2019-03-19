let express = require('express');
let app = express();
let http = require('http').Server(app);


app.use(express.static('../dist'));

// const hostname = '127.0.0.1';
const hostname = '0.0.0.0';
const port = 3001;
http.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

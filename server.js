require('dotenv').config();
const app = require('./src/app');


const serverPort = process.env.SERVER_PORT;


// Starting the server
app.listen(serverPort, () => {
  console.log(`${process.env.APP_NAME} server is running at http://localhost:${serverPort}`);
});


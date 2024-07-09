const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./Routes/routes')



const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(router);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

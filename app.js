const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
require('./startup/routes')(app);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`listening on port ${port}`));

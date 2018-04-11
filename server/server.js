const express = require('express');

const port = process.env.PORT || 5000;

const app = express();

require('./mongodb/dbConfig')(app);

app.listen(port, () => console.log(`Listening on port ${port}`));
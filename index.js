const express = require('express');

const app = express();

const PORT = process.env.port || 5055;

app.use(express.static(`${__dirname}/build`));

app.get('*', (req, res) => res.status(200).sendFile(`${__dirname}/build/index.html`));

app.listen(PORT, () => console.log(`boggle on port ${PORT}`));

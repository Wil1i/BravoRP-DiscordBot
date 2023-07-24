const express = require('express');
const bodyParser = require("body-parser")
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"));

const indexRouter = require("./routes/index")
app.use("/", indexRouter)

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;

const cors = require("cors");
const helmet = require("helmet");
app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));

const { createServer } = require("node:http");
const server = createServer(app);

server.listen(port, async () => {
    console.log(`App listening on port ${port}`);
});

const pjson = require("./package.json");
app.get("/", async (req, res) => {
    try {
        res.send(pjson.version);
    } catch (err) {
        console.log(err);
        res.send({ error: err.message });
    }
});

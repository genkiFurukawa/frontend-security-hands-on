const express = require("express");
const api = require("./routes/api");

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use("/api", api);

app.get("/", (req, res, next) => {
    res.end("Top Page"); // レスポンスを送信する関数
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});
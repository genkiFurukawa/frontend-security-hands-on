const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.setHeader("X-Timestamp", Date.now()); //(p.81)ヘッダをレスポンスに追加

    let message = req.query.message;

    const lang = req.headers["x-lang"]; //(p.84)リクエストヘッダを受け取る処理

    if (message === "") {
        res.status(400);
        if (lang === "en") {
            message = "message is empty";
        } else {
            message = "messageの値が空です";
        }
    }

    res.send({ message });
});

router.use(express.json());
router.post("/", (req, res) => {
    const body = req.body;
    console.log(body);
    res.end();
});

module.exports = router;
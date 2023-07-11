const express = require("express");
const router = express.Router();

const allowList = [
    "http://localhost:3000",
    "http://site.example:3000"
];

router.use((req, res, next) => {
    // http://localhost:3000からhttp://site.example:3000/apiのリクエストを成功させつつ、その他のオリジンからのアクセスを制限したいとき
    // => ヘッダのオリジンを確認し、オリジンが許可リストに入っているか確認する。
    // Originヘッダが存在している、かつリクエスト許可するリスト内にOriginヘッダの情報が含まれているかチェック
    if (req.headers.origin && allowList.includes(req.headers.origin)) {
        res.header("Access-Control-Allow-Origin", req.headers.origin);
    }
    
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Headers", "X-Token");
    }
    next();
});

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
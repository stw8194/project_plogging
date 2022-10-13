const express = require("express");
const router = express.Router();
const login_required = require("../middlewares/login_required");
const maria = require("../db/connect/maria");

const { upload } = require("../middlewares/file_upload");
const { fileDelete } = require("../middlewares/file_delete");
const uploadSingle = upload.single("file");
require("dotenv").config();

global.hostURL = process.env.Upload;

/* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("index", { title: "Review" });
// });

router.get("/", function (req, res) {
  maria.query(
    "SELECT reviewId, userId, description,createAt, name, reviewImg FROM REVIEW INNER JOIN USER ON USER.id = REVIEW.userId",
    function (err, rows, fields) {
      if (!err) {
        res.send(rows);
        // console.log(rows);
      } else {
        // console.log("err : " + err);
        res.send(err);
      }
    },
  );
});

router.get("/:reviewId", function (req, res) {
  const reviewId = req.params.reviewId;
  maria.query(
    "SELECT userId, description,createAt, name, reviewImg FROM REVIEW INNER JOIN USER ON USER.id = REVIEW.userId where reviewId = ?",
    [reviewId],
    function (err, rows, fields) {
      if (!err) {
        res.send(rows);
      } else {
        // console.log("err : " + err);
        res.send(err);
      }
    },
  );
});

// 리뷰 작성
router.post("/create", login_required, uploadSingle, async function (req, res, next) {
  const userId = req.currentUserId;

  try {
    const { description, createAt } = req.body;

    let imgName;
    if (req.file) {
      imgName = hostURL + req.file.filename;
    } else {
      imgName = hostURL + "default.jpg";
    }

    console.log(req.file);
    console.log(imgName);

    maria.query(
      `INSERT INTO REVIEW(userId, description, createAt, reviewImg) VALUES(?,?,?,?)`,
      [userId, description, createAt, imgName],
      function (err, rows, fields) {
        if (!err) {
          res.status(200).json({
            success: true,
            description: description,
            createAt: createAt,
            userId: userId,
            reviewId: rows.insertId,
            reviewImg: imgName,
          });
        } else {
          // console.log("err : " + err);
          res.send(err);
        }
      },
    );
  } catch (error) {
    next(error);
  }
});

// 빈 값이 들어오면 에러가 아니라 수정만 안 하도록 바꾸기  +
// 기존에 디폴트가 아니었고 && 새로운 이미지도 입력이 없을 시, update X 되도록 바꾸기
router.put("/:reviewId", login_required, uploadSingle, async function (req, res, next) {
  try {
    const reviewer = parseInt(req.body.userId);
    const userId = req.currentUserId;
    const description = req.body.description ?? null;
    const reviewId = req.params.reviewId;
    let imgName;

    if (reviewer !== userId) {
      return res.sendStatus(432);
    }

    if (req.file) {
      imgName = hostURL + req.file.filename;
      fileDelete(reviewId, req.file.filename);
    } else {
      imgName = hostURL + "default.jpg";
      fileDelete(reviewId, null);
    }

    maria.query(
      `UPDATE REVIEW SET  description = ?, reviewImg = ?  WHERE reviewId = ?`,
      [description, imgName, reviewId],
      async function (err, rows, fields) {
        if (!err) {
          res.status(200).json({
            success: true,
          });
        } else {
          // console.log("err : " + err);
          res.send(err);
        }
      },
    );
  } catch (error) {
    next(error);
  }
});

router.delete("/:reviewId", login_required, async function (req, res, next) {
  try {
    const reviewer = parseInt(req.body.userId);
    const userId = req.currentUserId;
    const reviewId = req.params.reviewId;

    if (reviewer !== userId) {
      return res.sendStatus(432);
    }

    fileDelete(reviewId);

    maria.query(`DELETE FROM REVIEW WHERE reviewId = ?`, [reviewId], async function (err, rows, fields) {
      if (!err) {
        res.status(200).json({ success: true });
      } else {
        // console.log("err : " + err);
        res.send(err);
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

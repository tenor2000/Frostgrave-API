const express = require("express");
const router = express.Router();
const error = require("../utilityFuncs/error");
const getDataFromSource = require("../utilityFuncs/getDataFromSource");

// api/users/

router.route("/").get(async (req, res, next) => {
  const searchtype = req.query.type || null;

  const userData = await getDataFromSource("userData", searchtype);

  userData ? res.json(userData) : next(error(404, "No Data Found"));
});

router
  .route("/:type")
  .get(async (req, res, next) => {
    const userData = await getDataFromSource("userData", req.params.type);
    userData ? res.json(userData) : next(error(404, "No Data Found"));
  })
  .post((req, res, next) => {
    // get form data and assign a random id
    const formData = req.body;
    // console.log(formData);
  });

module.exports = router;

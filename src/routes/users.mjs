import express from "express";
import error from "../utilityFuncs/error.mjs";
import getDataFromSource from "../utilityFuncs/getDataFromSource.mjs";

const router = express.Router();

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

export default router;

console.log("jobRoutes file loaded");
const express = require("express");
const router = express.Router();

const {
    createJob,
    getJobs,
    getJobById,
    updateJob,
    deleteJob
} = require("../controllers/jobController");

const {
    protect
} = require("../middleware/authMiddleware");

const {
    recruiterOnly
} = require("../middleware/roleMiddleware");

router.post(
    "/",
    protect,
    recruiterOnly,
    createJob
);

router.get("/", getJobs);
router.get("/:id", getJobById);

router.put(
    "/:id",
    protect,
    recruiterOnly,
    updateJob
);

router.delete(
    "/:id",
    protect,
    recruiterOnly,
    deleteJob
);
module.exports = router;
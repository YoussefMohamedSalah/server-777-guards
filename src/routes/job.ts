import { Router } from "express";
import { checkAuth } from "../middleware/checkAuth";
import { addJob, updateJob, getAllJobs, getJob, deleteJob, getAllJobsOpenClient } from "../controller/JobController";
import { getAllJobCandidates } from "../controller/CandidateController";

const router = Router();
// **************************************************
router.route("/open/").get(getAllJobsOpenClient)
router.route("/").get(checkAuth, getAllJobs).post(checkAuth, addJob).put(checkAuth, updateJob)
router.route("candidates/:id").get(checkAuth, getAllJobCandidates)
router.route("/:id").get(getJob).delete(checkAuth, deleteJob)
export { router as JobRouter };

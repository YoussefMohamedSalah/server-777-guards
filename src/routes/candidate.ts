import { Router } from "express";
import { checkAuth } from "../middleware/checkAuth";
import { addCandidate, deleteCandidate, getAllCandidates, getCandidate } from "../controller/CandidateController";

const router = Router();
// **************************************************
router.route("/").get(checkAuth, getAllCandidates).post(addCandidate).delete(checkAuth, deleteCandidate)
router.route("/:id").get(checkAuth, getCandidate)

export { router as CandidateRouter };

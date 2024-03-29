import { Router } from "express";
import { checkAuth } from "../middleware/checkAuth";
import { addCandidate, deleteCandidate, getAllCandidates, getCandidate } from "../controller/CandidateController";

const router = Router();
// **************************************************
router.route("/").get(checkAuth, getAllCandidates).post(addCandidate);
router.route("/:id").get(checkAuth, getCandidate).delete(checkAuth, deleteCandidate);

export { router as CandidateRouter };

import { Router } from "express";
import { checkAuth } from "../middleware/checkAuth";
import { contactRequest, getContactUs, getAllContactRequests, deleteContactUs } from "../controller/ContactController";

const router = Router();

router.route("/").post(contactRequest).get(checkAuth, getAllContactRequests);
router.route("/:id").get(checkAuth, getContactUs).delete(checkAuth, deleteContactUs);

export { router as ContactRouter };

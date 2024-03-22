import { Router } from "express";
import { checkAuth } from "../middleware/checkAuth";
import { contactRequest, getContactUs, getAllContactRequests } from "../controller/ContactController";

const router = Router();

router.route("/").post(contactRequest).get(checkAuth, getAllContactRequests);
router.route("/:id").get(checkAuth, getContactUs);

export { router as ContactRouter };

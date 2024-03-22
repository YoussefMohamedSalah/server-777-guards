import { Router } from "express";
import { checkAuth } from "../middleware/checkAuth";
import { getWebsiteInfo, updateWebsite } from "../controller/WebsiteController";

const router = Router();
// **************************************************
router.route("/:identifier").get(getWebsiteInfo).put(checkAuth, updateWebsite)

export { router as WebsiteRouter };

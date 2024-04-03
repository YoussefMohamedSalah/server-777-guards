import { Router } from "express";
import { checkAuth } from "../middleware/checkAuth";
import { addPartner, deletePartner, getAllPartners, updatePartner } from "../controller/PartnerController";
import uploadPartnerLogo from "../middleware/upload/uploadPartnerLogo";

const router = Router();
// **************************************************
router.route("/").get(getAllPartners).post(checkAuth, uploadPartnerLogo.single("logo"), addPartner)
router.route("/:id").put(checkAuth, updatePartner).delete(checkAuth, deletePartner);

export { router as PartnersRouter };

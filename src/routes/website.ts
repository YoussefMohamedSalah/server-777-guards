import { Router } from "express";
import { checkAuth } from "../middleware/checkAuth";
import { addCarouselImage, deleteCarouselImage, getCarouselImages, getWebsiteInfo, updateWebsite } from "../controller/WebsiteController";
import uploadCarousel from "../middleware/upload/uploadCarousel";

const router = Router();
// **************************************************
router.route("/:identifier").get(getWebsiteInfo).put(checkAuth, updateWebsite);
router.route("/banners/:identifier").get(getCarouselImages).post(checkAuth, uploadCarousel.single("banner"), addCarouselImage);
router.route("/banners/:identifier/:name").delete(checkAuth, deleteCarouselImage);


export { router as WebsiteRouter };

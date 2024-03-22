import { Router } from "express";
import { checkAuth } from "../middleware/checkAuth";

const router = Router();
// **************************************************
// router.route("/attendance").get(checkAuth, dashboardAttendance);

export { router as DashboardRouter };

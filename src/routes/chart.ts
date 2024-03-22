import { Router } from "express";
import { checkAuth } from "../middleware/checkAuth";

const router = Router();

// router.route("/project/expenses/:id").get(checkAuth, getInvoiceById);
// router.route("/project/progress/:id").get(checkAuth, getInvoiceById);
// router.route("/:id").get(checkAuth, getInvoiceById);
// router.route("/:id").get(checkAuth, getInvoiceById);
// router.route("/:id").get(checkAuth, getInvoiceById);

export { router as ChartRouter };

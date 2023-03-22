import { Router } from "express";
import logger from "./utils/logger";
import db from "./db";

const router = Router();

router.get("/", (_, res) => {
	logger.debug("Welcoming everyone...");
	res.json({ message: "Hello from kunji application" });
});

router.get("/admin/users", async (req, res) => {
	try {
		const dbData = await db.query("SELECT * FROM user_informations");
		res.status(200).json(dbData.rows);
	} catch (error) {
		res.status(500);
	}

});

export default router;
//

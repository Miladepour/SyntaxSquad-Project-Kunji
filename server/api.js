import { Router } from "express";
import logger from "./utils/logger";
import db from "./db";
const { auth } = require('express-oauth2-jwt-bearer');

const jwtCheck = auth({
	audience: 'http://localhost:3000/api/',
	issuerBaseURL: 'https://dev-smy0lct7oni31spt.us.auth0.com/',
	tokenSigningAlg: 'RS256'
});

const router = Router();

router.get("/", (_, res) => {
	logger.debug("Welcoming everyone...");
	res.json({ message: "Hello from kunji application" });
});

router.get("/admin/users", jwtCheck, async (req, res) => {
	
	try {
		const dbData = await db.query("SELECT * FROM user_informations");
		res.status(200).json(dbData.rows)
	} catch (error) {
		console.log(error);
		res.status(500);
	}

});

export default router;
//

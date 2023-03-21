import express from "express";
import cors from "cors";
import apiRouter from "./api";
import config from "./utils/config";
const sendMail = require("./routes/sendMail");
const ngo = require("./routes/ngo");

import {
	clientRouter,
	configuredHelmet,
	configuredMorgan,
	httpsOnly,
	logErrors,
} from "./utils/middleware";


const apiRoot = "/api";
const app = express();

app.use(express.json());
app.use(configuredHelmet());
app.use(configuredMorgan());
app.use(cors());
if (config.production) {
	app.enable("trust proxy");
	app.use(httpsOnly());
}

app.use(apiRoot, apiRouter);
app.use("/health", (_, res) => res.sendStatus(200));
app.use("/api/ngo", ngo);
app.use("/api/sendmail", sendMail);
app.use(clientRouter(apiRoot));
app.use(logErrors());

export default app;

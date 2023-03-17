import express from "express";
import cors from "cors";
import apiRouter from "./api";
import config from "./utils/config";
import {
	clientRouter,
	configuredHelmet,
	configuredMorgan,
	httpsOnly,
	logErrors,
} from "./utils/middleware";



const app = express();

app.use(express.json());
app.use(configuredHelmet());
app.use(configuredMorgan());
app.use(cors())
if (config.production) {
	app.enable("trust proxy");
	app.use(httpsOnly());
}

app.use("/", apiRouter);
app.use("/health", (_, res) => res.sendStatus(200));
app.use(clientRouter("/"));

app.use(logErrors());

export default app;

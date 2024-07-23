import express, {Request,Response} from "express";
import dotenv from "dotenv";

import logger from "./middlewares/logger";
import router from "./router/router"

dotenv.config();
const app = express();
const PORT = process.env.PORT ?? 3333;

app.use(logger("combined"));
app.use(router);

app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}.`);
});
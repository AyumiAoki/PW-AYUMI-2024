import express, {Request,Response} from "express";
import dotenv from "dotenv";
import morgan from "morgan"

import logger from "./middlewares/logger"

dotenv.config();
const app = express();
const PORT = process.env.PORT ?? 3333;

app.use(logger("combined"));

app.get("/", (req, res) => {
    res.send("Oii!");
});
app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}.`);
});
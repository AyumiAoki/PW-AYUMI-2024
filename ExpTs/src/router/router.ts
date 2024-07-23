import { Router } from "express";
import mainController from "../controllers/main"

const router = Router();

router.get("/", (req, res) => {
    res.send("Oii!");
});

router.get("/about", (req, res) => {
    res.send("Sobre a página!");
});

router.get("/lorem/:paragraphs", mainController.lorem);

export default router;
import { Router } from "express";
import mainController from "../controllers/main";
import majorController from "../controllers/major";

const router = Router();

//Major controller
router.get("/major", majorController.index);
router.get("/major/create", majorController.create);
router.post("/major/create", majorController.create);
router.get("/major/read/:id", majorController.read);
router.get("/major/update/:id", majorController.update);
router.post("/major/update/:id", majorController.update);
router.get("/major/remove/:id", majorController.remove);

//Main controller
router.get("/", mainController.index);
router.get("/about", mainController.about);
router.get("/lorem/:paragraphs", mainController.lorem);
router.get("/hb1", mainController.hb1);
router.get("/hb2", mainController.hb2);
router.get("/hb3", mainController.hb3);
router.get("/hb4", mainController.hb4);

export default router;
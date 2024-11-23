import { Router } from "express";
import {
    getJournals,
    createJournal,
    updateJournal,
    deleteJournal,
} from "../controllers/journalController";

const router = Router();

router.get("/", getJournals);
router.post("/", createJournal);
router.put("/:id", updateJournal);
router.delete("/:id", deleteJournal);

export default router;

import { Router } from "express";
import {
    getJournals,
    createJournal,
    updateJournal,
    deleteJournal,
    getJournalById,
    getJournalAnalysis,
} from "../controllers/journalController";
import { verifyJWT } from "../middleware/authMiddleware";

const router = Router();

router.get("/", verifyJWT, getJournals);
router.post("/", verifyJWT, createJournal);
router.put("/:id", verifyJWT, updateJournal);
router.delete("/:id", verifyJWT, deleteJournal);
router.get("/:id", verifyJWT, getJournalById);
router.get("/:id/analysis", verifyJWT, getJournalAnalysis);

export default router;

import { Router } from "express";
import {
    getJournals,
    createJournal,
    updateJournal,
    deleteJournal,
} from "../controllers/journalController";
import { verifyJWT } from "../middleware/authMiddleware";

const router = Router();

router.get("/", verifyJWT, getJournals);
router.post("/", verifyJWT, createJournal);
router.put("/:id", verifyJWT, updateJournal);
router.delete("/:id", verifyJWT, deleteJournal);

export default router;

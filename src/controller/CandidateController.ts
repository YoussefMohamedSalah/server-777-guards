import { Request, Response } from "express";
import { isValidUUID } from "../utils/validateUUID";
import { createCandidate, getCandidateById, getAllCandidatesByJobId, getCandidates } from "../repositories/CandidateRepository";
import { CreateCandidateInput } from "../types/CreateCandidateInput";
import { getJobById } from "../repositories/JobRepository";

export const addCandidate = async (req: Request, res: Response) => {
    const { name, birthday, phone_number, email, address, resource, start_date, jobId } = req.body;
    try {
        const job = await getJobById(jobId);
        if (!job) return res.status(404).json({ msg: "Job not found" });

        const createData: CreateCandidateInput = {
            name,
            birthday,
            phone_number,
            email,
            address,
            resource,
            start_date,
        };

        let candidate = await createCandidate(createData, job);
        if (!candidate) return res.status(404).json({ msg: "Field to create Candidate" });
        return res.status(200).json(candidate)
    } catch (error) {
        console.error("Error Adding Candidate:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

export const deleteCandidate = async (req: Request, res: Response) => {
    const { id } = req.params;
    let isValid = isValidUUID(id);
    if (!isValid) return res.status(400).json({ msg: "id is not valid" });
    try {
        const todo = await getCandidateById(id);
        if (!todo) return res.status(404).json({ msg: "Todo not found" });
        await todo.remove();
        return res.status(200).json({ msg: "Todo deleted" });
    } catch (error) {
        console.error("Error Deleting Todo:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

export const getAllCandidates = async (req: Request, res: Response) => {
    try {
        const candidates = await getCandidates();
        if (!candidates) return res.status(404).json({ msg: "candidates not found" });
        return res.status(200).json(candidates);
    } catch (error) {
        console.error("Error Retrieving job candidates:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

export const getAllJobCandidates = async (req: Request, res: Response) => {
    const { id } = req.params!;
    let isValid = isValidUUID(id);
    if (!isValid) return res.status(400).json({ msg: "job id is not valid" });
    try {
        const jobCandidates = await getAllCandidatesByJobId(id);
        if (!jobCandidates) return res.status(404).json({ msg: "job candidates not found" });
        return res.status(200).json(jobCandidates);
    } catch (error) {
        console.error("Error Retrieving job candidates:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

export const getCandidate = async (req: Request, res: Response) => {
    const { id } = req.params;
    let isValid = isValidUUID(id);
    if (!isValid) return res.status(400).json({ msg: "id is not valid" });
    try {
        const candidate = await getCandidateById(id);
        if (!candidate) return res.status(404).json({ msg: "Candidate not found" });
        return res.status(200).json(candidate);
    } catch (error) {
        console.error("Error Retrieving Candidate:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};
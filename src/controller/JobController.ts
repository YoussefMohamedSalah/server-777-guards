import { Request, Response } from "express";
import { isValidUUID } from "../utils/validateUUID";
import { createJob, getJobById, getJobs } from "../repositories/JobRepository";
import { CreateJobInput } from "../types/CreateJobInput";

export const addJob = async (req: Request, res: Response) => {
    const { title, shift, experience, education, skills, salary, location, duration, count, description } = req.body;
    try {
        const createData: CreateJobInput = {
            title,
            shift,
            experience,
            education,
            skills,
            salary,
            location,
            duration,
            count,
            description
        };

        let job = await createJob(createData);
        if (!job) return res.status(404).json({ msg: "Field to create job" });
        return res.status(200).json(job);
    } catch (error) {
        console.error("Error Adding Job:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

export const updateJob = async (req: Request, res: Response) => {
    const { title, description, shift, experience, education, skills, salary, location, duration, count } = req.body;
    const { id } = req.params;
    let isValid = isValidUUID(id);
    if (!isValid) return res.status(400).json({ msg: "id is not valid" });
    try {
        const job = await getJobById(id);
        if (!job) return res.status(404).json({ msg: "Job not found" });

        job.title = title ? title : job.title;
        job.description = description ? description : job.description;
        job.shift = shift ? shift : job.shift;
        job.experience = experience ? experience : job.experience;
        job.education = education ? education : job.education;
        job.skills = skills ? skills : job.skills;
        job.salary = salary ? salary : job.salary;
        job.location = location ? location : job.location;
        job.duration = duration ? duration : job.duration;
        job.count = count ? count : job.count;
        await job.save();
        return res.status(200).json(job);
    } catch (error) {
        console.error("Error Updating Job:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

export const deleteJob = async (req: Request, res: Response) => {
    const { id } = req.params;
    let isValid = isValidUUID(id);
    if (!isValid) return res.status(400).json({ msg: "id is not valid" });
    try {
        const job = await getJobById(id);
        if (!job) return res.status(404).json({ msg: "Job not found" });
        await job.remove();
        return res.status(200).json({ msg: "Job deleted" });
    } catch (error) {
        console.error("Error Deleting Job:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

export const getAllJobs = async (req: Request, res: Response) => {
    try {
        const jobs = await getJobs();
        if (!jobs) return res.status(404).json({ msg: "Jobs not found" });
        return res.status(200).json(jobs);
    } catch (error) {
        console.error("Error Retrieving Jobs:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

export const getJob = async (req: Request, res: Response) => {
    const { id } = req.params;
    let isValid = isValidUUID(id);
    if (!isValid) return res.status(400).json({ msg: "id is not valid" });
    try {
        const job = await getJobById(id);
        if (!job) return res.status(404).json({ msg: "Job not found" });
        return res.status(200).json(job);
    } catch (error) {
        console.error("Error Retrieving Job:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};
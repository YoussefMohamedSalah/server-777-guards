import { getRepository } from "typeorm";
import { Candidate } from "../entities/Candidate";
import { Job } from "../entities/Job";
import { CreateCandidateInput } from "../types/CreateCandidateInput";

export const createCandidate = async (createInput: CreateCandidateInput, job: Job) => {
    const {
        name,
        birthday,
        phone_number,
        email,
        address,
        resource,
        start_date,
    } = createInput;
    try {
        const candidateRepository = getRepository(Candidate);
        const candidate = new Candidate();
        if (name) candidate.name = name;
        if (birthday) candidate.birthday = birthday;
        if (phone_number) candidate.phone_number = phone_number;
        if (email) candidate.email = email;
        if (address) candidate.address = address;
        if (resource) candidate.resource = resource;
        if (start_date) candidate.start_date = start_date;
        candidate.job = job;
        await candidateRepository.save(candidate);
        return candidate;
    } catch (error) {
        // Handle the error
        console.error("Error Creating Candidate:", error);
        return;
    }
};

export const getCandidateById = async (id: string) => {
    try {
        const candidateRepository = getRepository(Candidate);
        const candidate = await candidateRepository.createQueryBuilder("candidate")
            .where("candidate.id = :id", { id: id })
            .leftJoinAndSelect("candidate.job", "job")
            .getOne();
        return candidate;
    } catch (error) {
        // Handle the error
        console.error("Error Retrieving Candidate:", error);
        return;
    }
};


export const getCandidates = async () => {
    try {
        const candidateRepository = getRepository(Candidate);
        const jobCandidates = await candidateRepository
            .createQueryBuilder("candidate")
            .leftJoinAndSelect("candidate.job", "job")
            .getMany();
        return jobCandidates;
    } catch (error) {
        // Handle the error
        console.error("Error Retrieving Candidates:", error);
        return;
    }
};

export const getAllCandidatesByJobId = async (jobId: string) => {
    try {
        const candidateRepository = getRepository(Candidate);
        const jobCandidates = await candidateRepository
            .createQueryBuilder("candidate")
            .where("candidate.jobId = :jobId", { jobId: jobId })
            .leftJoinAndSelect("candidate.job", "job")
            .getMany();
        return jobCandidates;
    } catch (error) {
        // Handle the error
        console.error("Error Retrieving Candidates:", error);
        return;
    }
};

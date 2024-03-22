import { getRepository } from "typeorm";
import { Job } from "../entities/Job";
import { CreateJobInput } from "../types/CreateJobInput";

export const createJob = async (createInput: CreateJobInput) => {
    const {
        title,
        shift,
        experience,
        description,
        education,
        skills,
        salary,
        location,
        duration,
        count,
    } = createInput;
    try {
        const jobRepository = getRepository(Job);
        const job = new Job();
        if (title) job.title = title;
        if (description) job.description = description;
        if (shift) job.shift = shift;
        if (experience) job.experience = experience;
        if (education) job.education = education;
        if (skills) job.skills = skills;
        if (salary) job.salary = salary;
        if (location) job.location = location;
        if (duration) job.duration = duration;
        if (count) job.count = count;
        await jobRepository.save(job);
        return job;
    } catch (error) {
        // Handle the error
        console.error("Error Creating Job:", error);
        return;
    }
};

export const getJobById = async (id: string) => {
    try {
        const jobRepository = getRepository(Job);
        const job = await jobRepository.createQueryBuilder("job").where("job.id = :id", { id: id }).getOne();
        return job;
    } catch (error) {
        // Handle the error
        console.error("Error Retrieving Job:", error);
        return;
    }
};

export const getJobs = async () => {
    try {
        const jobRepository = getRepository(Job);
        const userTodos = await jobRepository
            .createQueryBuilder("job")
            .leftJoinAndSelect("job.candidates", "candidate")
            .getMany();
        return userTodos;
    } catch (error) {
        // Handle the error
        console.error("Error Retrieving Jobs:", error);
        return;
    }
};

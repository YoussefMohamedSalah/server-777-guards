import { Website } from "../entities/Website";
import { getRepository } from "typeorm";

export const getWebsite = async (identifier: string) => {
    try {
        const websiteRepository = getRepository(Website);
        const website = await websiteRepository
            .createQueryBuilder("website")
            .where("website.identifier = :identifier", { identifier: identifier })
            .getOne();
        return website;
    } catch (error) {
        // Handle the error
        console.error("Error Retrieving Website:", error);
        return;
    }
};

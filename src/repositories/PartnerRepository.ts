import { Partner } from "../entities/Partner";
import { getRepository } from "typeorm";

export const getPartnerById = async (id: string) => {
    try {
        const partnerRepository = getRepository(Partner);
        const partner = await partnerRepository
            .createQueryBuilder("partner")
            .where("partner.id = :id", { id: id })
            .getOne();
        return partner;
    } catch (error) {
        // Handle the error
        console.error("Error Retrieving Partner:", error);
        return;
    }
};

export const getPartners = async () => {
    try {
        const partnerRepository = getRepository(Partner);
        const partners = await partnerRepository
            .createQueryBuilder("partner")
            .getMany();
        return partners;
    } catch (error) {
        // Handle the error
        console.error("Error Retrieving Partners:", error);
        return;
    }
};
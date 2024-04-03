import { Request, Response } from "express";
import { deleteFile } from "../helpers/deleteFile";
import { getPartnerById, getPartners } from "../repositories/PartnerRepository";
import { getRepository } from "typeorm";
import { Partner } from "../entities/Partner";

export type FileProps = {
    name: string;
    url: string;
};


export const getAllPartners = async (req: Request, res: Response) => {
    try {
        const partners = await getPartners();
        if (!partners) return res.status(404).json({ msg: "Partners not found" });
        console.log(partners)
        return res.status(200).json(partners);
    } catch (error) {
        console.error("Error Retrieving Partners:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

export const addPartner = async (req: Request, res: Response) => {
    const { name, address } = req.body;

    try {
        const logo = req.file!;

        const partnerRepository = getRepository(Partner);
        const partner = new Partner();
        if (name) partner.name = name;
        if (address) partner.address = address;
        if (logo) {
            const newFile: FileProps = {
                name: logo.originalname,
                url: `uploads/partners/${logo.filename}`,
            };
            partner.logo = newFile
        }
        await partnerRepository.save(partner);
        return res.status(200).json(partner);

    } catch (error) {
        // Handle the error
        console.error("Error while adding Partner:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

export const updatePartner = async (req: Request, res: Response) => {
    const { name, address } = req.body;
    const { id } = req.params;

    try {
        const logo = req.file!;
        const partner = await getPartnerById(id);
        if (!partner) return res.status(404).json({ msg: "Partner not found" });
        partner.name = name;
        partner.address = address;
        if (logo) {
            const newFile: FileProps = {
                name: logo.originalname,
                url: `uploads/partners/${logo.filename}`,
            };
            partner.logo = newFile
        }

        await partner.save();
        return res.status(200).json(partner);
    } catch (error) {
        console.error("Error Updating Partner:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

export const deletePartner = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const partner = await getPartnerById(id);
        if (!partner) return res.status(404).json({ msg: "Partner not found" });

        let removedLogo = partner.logo
        console.log(removedLogo)
        if (removedLogo && removedLogo.url) {
            deleteFile(removedLogo.url);
        }

        await partner.remove();
        return res.status(200).json({ msg: "Partner deleted" });
    } catch (error) {
        // Handle the error
        console.error("Error while deleting Banner:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}

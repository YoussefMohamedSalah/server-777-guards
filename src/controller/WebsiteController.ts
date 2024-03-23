import { Request, Response } from "express";
import { getWebsite } from "../repositories/WebsiteRepository";

export const updateWebsite = async (req: Request, res: Response) => {
    const { name, email, land_line, phone_number_1, phone_number_2, address, facebook, instagram, tiktok } = req.body;
    const { identifier } = req.params;

    try {
        const website = await getWebsite(identifier);
        if (!website) return res.status(404).json({ msg: "Website not found" });
        website.name = name ? name : website.name;
        website.email = email ? email : website.email;
        website.land_line = land_line ? land_line : website.land_line;
        website.phone_number_1 = phone_number_1 ? phone_number_1 : website.phone_number_1;
        website.phone_number_2 = phone_number_2 ? phone_number_2 : website.phone_number_2;
        website.address = address ? address : website.address;
        website.facebook = facebook ? facebook : website.facebook;
        website.instagram = instagram ? instagram : website.instagram;
        website.tiktok = tiktok ? tiktok : website.tiktok;
        await website.save();
        return res.status(200).json(website);
    } catch (error) {
        console.error("Error Updating Website:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

export const getWebsiteInfo = async (req: Request, res: Response) => {
    const { identifier } = req.params;
    try {
        const website = await getWebsite(identifier);
        if (!website) return res.status(404).json({ msg: "Website not found" });
        return res.status(200).json(website);
    } catch (error) {
        console.error("Error Retrieving Website:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};
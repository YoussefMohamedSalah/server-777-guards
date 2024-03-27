import { Request, Response } from "express";
import { getWebsite } from "../repositories/WebsiteRepository";
import { deleteFile } from "../helpers/deleteFile";

export type FileProps = {
    name: string;
    url: string;
};

export const updateWebsite = async (req: Request, res: Response) => {
    const { name, email, land_line, phone_number_1, phone_number_2, ar_address, en_address, facebook, instagram, linkedin } = req.body;
    const { identifier } = req.params;

    try {
        const website = await getWebsite(identifier);
        if (!website) return res.status(404).json({ msg: "Website not found" });
        website.name = name;
        website.email = email;
        website.land_line = land_line;
        website.phone_number_1 = phone_number_1;
        website.phone_number_2 = phone_number_2;
        website.ar_address = ar_address;
        website.en_address = en_address;
        website.facebook = facebook;
        website.instagram = instagram;
        website.linkedin = linkedin;
        await website.save();
        return res.status(200).json(website);
    } catch (error) {
        console.error("Error Updating Website:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

export const getCarouselImages = async (req: Request, res: Response) => {
    const { identifier } = req.params;

    try {
        const website = await getWebsite(identifier);
        if (!website) return res.status(404).json({ msg: "Website not found" });
        return res.status(200).json(website.banners);
    } catch (error) {
        // Handle the error
        console.error("Error while getting Banners:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}

export const addCarouselImage = async (req: Request, res: Response) => {
    const { identifier } = req.params;

    try {
        const banner = req.file!;
        const website = await getWebsite(identifier);
        if (!website) return res.status(404).json({ msg: "Website not found" });
        if (banner) {
            const newFile: FileProps = {
                name: banner.originalname,
                url: `uploads/carousel/${banner.filename}`,
            };
            website.banners = [...website.banners, newFile]
            await website.save();
        }
        return res.status(200).json(website);
    } catch (error) {
        // Handle the error
        console.error("Error while adding Banner:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}

export const deleteCarouselImage = async (req: Request, res: Response) => {
    const { identifier, name } = req.params;

    try {
        const website = await getWebsite(identifier);
        if (!website) return res.status(404).json({ msg: "Website not found" });
        let filteredBannersArr: FileProps[] = [...website.banners];


        if (website.banners && name) {
            // Find the banner to be removed in the existing banners array
            let removedBanner = website.banners.find((file: FileProps) => file.name === name);
            if (removedBanner) {
                deleteFile(removedBanner.url);
                filteredBannersArr = filteredBannersArr.filter((file: FileProps) => file.name !== name);
            }
        }

        website.banners = [...filteredBannersArr]
        await website.save();
        return res.status(200).json(website);
    } catch (error) {
        // Handle the error
        console.error("Error while deleting Banner:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}

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
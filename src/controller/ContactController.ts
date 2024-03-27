import { Request, Response } from "express";
import { CreateContactUsInput } from "../types/CreateContactUsInput";
import { createContactUsRequest, getAllContactUsRequests, getContactById } from "../repositories/ContactUsRepository";
import { isValidUUID } from "../utils/validateUUID";
import { createNotification } from "../repositories/NotificationRepository";

export const contactRequest = async (req: Request, res: Response) => {
    const { full_name, email, subject, info, phone_number } = req.body;
    try {
        const createData: CreateContactUsInput = {
            full_name,
            phone_number,
            email,
            subject,
            info,
        };

        let contact = await createContactUsRequest(createData);
        if (!contact) return res.status(404).json({ msg: "Field to create contact" });

        let title = "New Contact Request";
        let content = `New Contact us Request Just Arrived By ${email!} with Subject of ${subject!}. Please Check It Out.`;
        let url = `/contact_rev/${contact.id}`;
        await createNotification(title, content, url);

        return res.status(200).json(contact);
    } catch (error) {
        console.error("Error Adding Contact us:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

export const getAllContactRequests = async (req: Request, res: Response) => {
    try {
        const contactUs = await getAllContactUsRequests();
        if (!contactUs) return res.status(404).json({ msg: "Contact us requests not found" });
        return res.status(200).json(contactUs);
    } catch (error) {
        console.error("Error Retrieving Contact us requests:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

export const getContactUs = async (req: Request, res: Response) => {
    const { id } = req.params;
    let isValid = isValidUUID(id);
    if (!isValid) return res.status(400).json({ msg: "id is not valid" });
    try {
        const contactUs = await getContactById(id);
        if (!contactUs) return res.status(404).json({ msg: "Contact request not found" });
        return res.status(200).json(contactUs);
    } catch (error) {
        console.error("Error Retrieving Contact request:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};
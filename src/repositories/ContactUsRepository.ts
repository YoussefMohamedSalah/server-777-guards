import { getRepository } from "typeorm";
import { Contact } from "../entities/ContactRequest";
import { CreateContactUsInput } from "../types/CreateContactUsInput";

export const createContactUsRequest = async (createInput: CreateContactUsInput) => {
    const {
        full_name,
        phone_number,
        email,
        subject,
        info,
    } = createInput;
    try {
        const contactRepository = getRepository(Contact);
        const contact = new Contact();
        if (full_name) contact.full_name = full_name;
        if (email) contact.email = email;
        if (subject) contact.subject = subject;
        if (info) contact.info = info;
        if (phone_number) contact.phone_number = phone_number;
        await contactRepository.save(contact);
        return contact;
    } catch (error) {
        // Handle the error
        console.error("Error Creating Contact:", error);
        return;
    }
};

export const getContactById = async (id: string) => {
    try {
        const contactRepository = getRepository(Contact);
        const contact = await contactRepository.createQueryBuilder("contact").where("contact.id = :id", { id: id }).getOne();
        return contact;
    } catch (error) {
        // Handle the error
        console.error("Error Retrieving Contact:", error);
        return;
    }
};

export const getAllContactUsRequests = async () => {
    try {
        const contactRepository = getRepository(Contact);
        const userTodos = await contactRepository
            .createQueryBuilder("contact")
            .getMany();
        return userTodos;
    } catch (error) {
        // Handle the error
        console.error("Error Retrieving Jobs:", error);
        return;
    }
};

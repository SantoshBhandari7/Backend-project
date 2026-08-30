import mongoose from "mongoose";
import { required } from "zod/mini";


const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required,
    }
}, { timestamps: true });

const Contact = mongoose.model("contact", contactSchema);
export default Contact;
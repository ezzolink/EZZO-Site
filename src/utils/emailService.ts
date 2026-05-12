import emailjs from '@emailjs/browser';

// Substitua estas constantes pelas suas credenciais do EmailJS
// Crie uma conta em https://www.emailjs.com/
// 1. Create Service (ex: Gmail) -> SERVICE_ID
// 2. Create Template -> TEMPLATE_ID
// 3. Account -> Public Key -> PUBLIC_KEY

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_ezzo.digital";
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_0rhfpj8";
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "OJp-rEk-anJ2JNTq4";

export const initEmailjs = () => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
};

export const sendEmail = async (templateParams: Record<string, unknown>) => {
    try {
        const response = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            templateParams,
            EMAILJS_PUBLIC_KEY
        );
        return response;
    } catch (error) {
        console.error("Erro ao enviar email pelo EmailJS:", error);
        throw error;
    }
};

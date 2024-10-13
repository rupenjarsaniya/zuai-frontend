import { pdfjs } from "react-pdf";

export const fileToBase64 = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            resolve(reader.result as string);
        };
        reader.onerror = (error) => reject(error);
    });
};

export const countPdfWords = async (pdfData: string): Promise<number> => {
    const pdf = await pdfjs.getDocument(pdfData).promise;
    const pagesText = await Promise.all(
        Array.from({ length: pdf.numPages }, async (_, pageIndex) => {
            const page = await pdf.getPage(pageIndex + 1);
            const textContent = await page.getTextContent();
            return textContent.items
                .map((item) => {
                    if ("str" in item) {
                        return item.str;
                    }
                    return ""; // Ignore non-text content
                })
                .join(" ");
        }),
    );

    const totalText = pagesText.join(" ");
    const wordCount = totalText ? totalText.split(/\s+/).filter(Boolean).length : 0;
    return wordCount;
};

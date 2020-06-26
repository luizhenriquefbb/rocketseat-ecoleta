interface ISubmissionData {
    image: string,
    name: string,
    email: string,
    whatsapp: string,

    latitude: number,
    longitude: number,

    city: string | null,
    UF: string | null,

    items: number[],
};

export default ISubmissionData;
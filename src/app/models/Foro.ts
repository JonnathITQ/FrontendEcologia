export interface Foro {
    _id: string;
    titulo: string;
    contenido: string;
    autor?: string; // ObjectId
    comentarios?: any[]; // Array of comments
    createdAt?: Date;
}

export interface Consejo {
    _id: string;
    titulo: string;
    descripcion: string;
    imagen?: string;
    autor?: string; // ObjectId
    createdAt?: Date;
}

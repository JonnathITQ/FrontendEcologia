export interface Galeria {
    _id: string;
    titulo: string;
    descripcion: string;
    imagen: string;
    autor?: string; // ObjectId
    likes?: number;
    createdAt?: Date;
}

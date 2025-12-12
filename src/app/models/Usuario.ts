export interface Usuario {
    _id: string;
    nombre: string;
    apellido: string;
    correo: string;
    descripcion?: string;
    contrasenia?: string;
    imagen?: string;
    telefono?: string;
    role?: string;
}

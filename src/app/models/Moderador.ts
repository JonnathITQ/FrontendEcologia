export class Moderador {
    constructor(
        public _id: string,
        public nombre: string,
        public apellido: string,
        public cedula: number,
        public correo: string,
        public contrasenia: string,
        public seguroMedico: boolean,
        public tipoSangre: string,
        public imagen: string,
        public role?: string
    ) { }
}

import { Hospital } from "./hospitales.models";

interface UserMedico{
    _id: string;
    nombre: string;
    img: string;
}

export class Medico{
    constructor(
        public _id: string,
        public nombre: string,
        public img: string,
        public hospital: Hospital,
        public usuario: UserMedico
    ){ 

    }
}


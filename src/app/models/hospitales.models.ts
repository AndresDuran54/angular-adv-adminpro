interface _UsuarioHospital{
    _id: string;
    nombre: string;
    email: string;
}

export class Hospital{

    constructor(
        public _id: string,
        public nombre: string,
        public img: string,
        public usuario: _UsuarioHospital
    ){

    }
}
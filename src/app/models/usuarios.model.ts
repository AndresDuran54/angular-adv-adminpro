import { environment } from "src/environments/environment";

const base_url = environment.url_prod;

export class Usuario{

    constructor(
        public nombre :String,
        public email :String,
        public img? :String,
        public role? :String,
        public google? :boolean,
        public uid? :String,
    ){

    }

    //http://localhost:3000/api/upload/medicos/286b8130-7c21-43e1-bcaf-2181a2a8617f.jpg
    get imagenUsuario(){
        
        if(this.img?.includes('https')){
            return this.img;
        }

        if(this.img){
            return `${base_url}/upload/usuarios/${this.img}`;
        }else{
            return `${base_url}/upload/usuarios/no-image`;
        }
    }

} 
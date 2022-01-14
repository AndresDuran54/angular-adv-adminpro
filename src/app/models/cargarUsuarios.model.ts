import { Usuario } from "./usuarios.model";

export interface CargarUsuarios{
    total: number;
    usuarios: Usuario[];
}
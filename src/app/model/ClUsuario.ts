export class ClUsuario {
    id: number;
    username: string;
    password: string;
    avatar: string;
      constructor(obj: any){
          this.id = obj && obj.id || null
          this.username = obj && obj.nombre || null
          this.password = obj && obj.descripcion || null
          this.avatar = obj && obj.cantidad || null
      }
}
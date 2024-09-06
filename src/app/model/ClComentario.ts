export class ClComentario {
    id: number;
    id_prod: number;
    user : string;
    resenna: string;
      constructor(obj: any){
          this.id = obj && obj.id || null
          this.id_prod = obj && obj.id_prod || null
          this.user = obj && obj.user || null
          this.resenna = obj && obj.resenna || null
      }
}
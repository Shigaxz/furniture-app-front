export class ClBodega {
    id: number;
    direccion: string;
    comuna: string;
    region: string;
    telefono: number;
      constructor(obj: any){
          this.id = obj && obj.id || null
          this.direccion = obj && obj.direccion || null
          this.comuna = obj && obj.comuna || null
          this.region = obj && obj.region || null
          this.telefono = obj && obj.telefono || null
      }
}
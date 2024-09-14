export class ClDetalleV {
    id: number;
    idUser: number;
    productos: any[]
    plata: number;
    estado: string;
      constructor(obj: any){
          this.id = obj && obj.id || null
          this.idUser = obj && obj.idUser || null
          this.productos = obj && obj.productos || null
          this.plata = obj && obj.plata || null
          this.estado = obj && obj.estado || null
      }
}
export class ClDetalleV {
    id: number;
    sucursal: string;
    productos: []
    plata: number
      constructor(obj: any){
          this.id = obj && obj.id || null
          this.sucursal = obj && obj.sucursal || null
          this.productos = obj && obj.productos || null
          this.plata = obj && obj.plata || null
      }
}
export class ClDetalleC {
    id: number;
    sucursal: string;
    prod : number;
    stock: number;
      constructor(obj: any){
          this.id = obj && obj.id || null
          this.sucursal = obj && obj.sucursal || null
          this.prod = obj && obj.prod || null
          this.stock = obj && obj.stock || null
      }
}
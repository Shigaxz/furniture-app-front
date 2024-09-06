export class ClCategoria {
    id: number;
    nombre: string;
      constructor(obj: any){
          this.id = obj && obj.id || null
          this.nombre = obj && obj.nombre || null
      }
}
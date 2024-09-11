export class ClUsuario {
    id: number;
    username: string;
    password: string;
    avatar: string;
    role: number;
      constructor(obj: any){
          this.id = obj && obj.id || null
          this.username = obj && obj.username || null
          this.password = obj && obj.password || null
          this.avatar = obj && obj.avatar || null
          this.role = obj && obj.role || null

      }
}
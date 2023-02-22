export class Producto {
    constructor(public id:number, public descripcion:string, public importeUnitario:number) {}

    public static crearProductoVacio() {
        return (new Producto(0, null, null));
    }

}
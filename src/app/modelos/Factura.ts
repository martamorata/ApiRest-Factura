import { LineaDetalle } from './LineaDetalle';

export class Factura {
    constructor(public id: number,
        public cliente: string,
        public porcentajeIva: number,
        public productos: LineaDetalle[]) { }

        public static crearFacturaVacia() {
            return(new Factura(0, null, null, null));
        }
}
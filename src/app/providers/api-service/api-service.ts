import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Cliente } from "src/app/modelos/Cliente";
import { Factura } from "src/app/modelos/Factura";
import { Producto } from "src/app/modelos/Producto";

@Injectable()
export class ApiServiceProvider {

    private URL = "http://localhost:3000";

    // Variable para paginar el GET Clientes.
    private pagina = 1;

    constructor(public http: HttpClient) {
    }
    
    getFacturas():Promise<Factura[]> {
        let promise = new Promise<Factura[]>((resolve, reject) => {
            this.http.get(this.URL + "/facturas").toPromise()
            .then((data:any) => {
                let facturas = new Array<Factura>();
                data.forEach((factura: Factura) => {
                    facturas.push(factura)
                });
                resolve(facturas);
            })
            .catch((error: Error) => {
                reject(error.message);
            });
        });
        return promise;
    } // End getFacturas()

    getClientes():Promise<Cliente[]> {
        let promise = new Promise<Cliente[]>((resolve, reject) => {
            this.http.get(this.URL + "/clientes?_page=" + this.changePage() + "&_limit=10").toPromise() // Petición que pagina los clientes.
            .then((data:any) => {
                let clientes = new Array<Cliente>();
                data.forEach((cliente: Cliente) => {
                    clientes.push(cliente)
                });
                resolve(clientes);
            })
            .catch((error: Error) => {
                reject(error.message);
            });
        });
        return promise;
    } // End getClientes()

    getProductos():Promise<Producto[]> {
        let promise = new Promise<Producto[]>((resolve, reject) => {
            this.http.get(this.URL + "/productos").toPromise()
            .then((data:any) => {
                let productos = new Array<Producto>();
                data.forEach((producto: Producto) => {
                    productos.push(producto)
                });
                resolve(productos);
            })
            .catch((error: Error) => {
                reject(error.message);
            });
        });
        return promise;
    } // End getProductos()

    insertFactura(datosNuevaFactura: Factura): Promise<Factura> {
        let promise = new Promise<Factura>((resolve, reject) => {
            var header = { "headers": {"Content-Type": "application/json"}};

            let datos = JSON.stringify(datosNuevaFactura);
            this.http.post(this.URL + "/facturas/", datos, header).toPromise()
            .then((data:any) => {
                let factura: Factura;
                factura = data;
                resolve(factura);
            })
            .catch((error: Error) => {
                reject(error.message)
            });
        });
        return promise;
    } // End insertFactura()

    changePage() {
        return this.pagina++;
    }

    insertCliente(datosNuevoCliente: Cliente): Promise<Cliente> {
        let promise = new Promise<Cliente>((resolve, reject) => {
            var header = { "headers": {"Content-Type": "application/json"}};

            let datos = JSON.stringify(datosNuevoCliente);
            this.http.post(this.URL + "/clientes/", datos, header).toPromise()
            .then((data:any) => {
                let cliente: Cliente;
                cliente = data;
                resolve(cliente);
            })
            .catch((error: Error) => {
                reject(error.message)
            });
        });
        return promise;
    } // End insertCliente()


    // Método PUT (Modificar)
    modificarCliente(nuevosDatosCliente: Cliente):Promise<Cliente> {
        let promise = new Promise<Cliente>((resolve, reject) => {
            var header = { "headers": { "Content-Type": "application/json" } };
            let datos = JSON.stringify(nuevosDatosCliente);
            this.http.put(this.URL + "/clientes/" + nuevosDatosCliente.id,
                datos,
                header).toPromise().then(
                    (data: any) => { // Success
                        let cliente: Cliente;
                        cliente = data;
                        resolve(cliente);
                    }
                )
                .catch((error: Error) => {
                    reject(error.message);
                });
        });
        return promise; 
        }

        // Método DELETE
        eliminarCliente(id: number): Promise<Boolean> {
            let promise = new Promise<Boolean>((resolve, reject) => {
                this.http.delete(this.URL + "/clientes/" + id).toPromise().then(
                    (data: any) => { // Success
                        console.log(data)
                        resolve(true);
                    }
                )
                    .catch((error: Error) => {
                        console.log(error.message);
                        reject(error.message);
                    });
            });
            return promise;
        }//end_eliminar_alumno

 }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando = true;
  producto: Producto[] = [];
  productoFiltrado: Producto[] = [];
  
  constructor( private http: HttpClient)
  {
    this.cargarProducto();
  }

  private cargarProducto() {
    return new Promise( ( resolve, reject ) => {
      this.http.get('https://angular-html-30652.firebaseio.com/productos_idx.json')
          .subscribe( (resp: Producto[]) => {
             this.producto = resp;
             this.cargando = false;
             resolve();
      });
    });
  }

  getProducto( id: string ) {
    return this.http.get(`https://angular-html-30652.firebaseio.com/productos/${ id }.json`);
  }

  buscarProducto( termino: string) {
    console.log(termino);
    if ( this.producto.length === 0 ) {
      this.cargarProducto().then( () => {
            // ejecutar despues de tener los productos
            // Aplicar el filtro
            this.filtrarProductos( termino );
      });
    } else {
        // Aplicar el filtro
        this.filtrarProductos( termino );
    }
  }
  private filtrarProductos( termino: string) {
    this.productoFiltrado = [];

    termino = termino.toLocaleLowerCase();
    this.producto.forEach( prod => {
      const tituloLower = prod.titulo.toLocaleLowerCase();
       if ( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0 ) {
          this.productoFiltrado.push( prod );
       }
    });
  }
}

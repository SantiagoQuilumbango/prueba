import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Iproveedor } from 'src/app/Interfaces/iproveedor';
import { IUnidadMedida } from 'src/app/Interfaces/iunidadmedida';
import { IProducto } from 'src/app/Interfaces/iproducto';
import { ProveedorService } from 'src/app/Services/proveedores.service';
import { UnidadmedidaService } from 'src/app/Services/unidadmedida.service';
import { ProductoService } from 'src/app/Services/productos.service';
import { Router, ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-nuevoproducto',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './nuevoproducto.component.html',
  styleUrl: './nuevoproducto.component.scss'
})
export class NuevoproductoComponent implements OnInit {
  listaUnidadMedida: IUnidadMedida[] = [];
  listaProveedores: Iproveedor[] = [];
  listaProductos: IProducto[] = [];
  titulo = 'Nuevo Producto';
  frm_Producto: FormGroup;
  idProducto: number = 0;
  constructor(
    private uniadaServicio: UnidadmedidaService,
    private fb: FormBuilder,
    private proveedoreServicio: ProveedorService,
    private productoServicio: ProductoService,
    private navegacion: Router,
    private ruta: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.idProducto = parseInt(this.ruta.snapshot.paramMap.get('id') || '0'); 
    this.frm_Producto = new FormGroup({
      Codigo_Barras: new FormControl('', Validators.required),
      Nombre_Producto: new FormControl('', Validators.required),
      Graba_IVA: new FormControl('', Validators.required),
      Unidad_Medida_idUnidad_Medida: new FormControl('', Validators.required),
      IVA_idIVA: new FormControl('', Validators.required),
      Cantidad: new FormControl('', [Validators.required, Validators.min(1)]),
      Valor_Compra: new FormControl('', [Validators.required, Validators.min(0)]),
      Valor_Venta: new FormControl('', [Validators.required, Validators.min(0)]),
      Proveedores_idProveedores: new FormControl('', Validators.required)
    });
    this.productoServicio.todos().subscribe({
      next: (data) => {
        this.listaProductos = data;
        

      },
      error: (e) => {
        console.log(e);
      }
    });
    //7
    this.uniadaServicio.todos().subscribe((data) => (this.listaUnidadMedida = data));
    this.proveedoreServicio.todos().subscribe((data) => (this.listaProveedores = data));

    //this.crearFormulario();


if (this.idProducto > 0) {
  this.productoServicio.uno(this.idProducto).subscribe((producto) => {
    console.log('Datos recibidos:', producto);
    this.frm_Producto.patchValue({
      Codigo_Barras: producto.Codigo_Barras,
      Nombre_Producto: producto.Nombre_Producto,
      Graba_IVA: producto.Graba_IVA,
      Unidad_Medida_idUnidad_Medida: producto.Unidad_Medida_idUnidad_Medida,
      IVA_idIVA: producto.IVA_idIVA,
      Cantidad: producto.Cantidad,
      Valor_Compra: producto.Valor_Compra,
      Valor_Venta: producto.Valor_Venta,
      Proveedores_idProveedores: producto.Proveedores_idProveedores

    });
    this.titulo = 'Actualizar Producto';
  });
}
  }
  limpiarcaja() {
    alert('Limpiar Caja');
  }
  //crearFormulario() {
    /* this.frm_Producto = this.fb.group({
      Codigo_Barras: ['', Validators.required],
      Nombre_Producto: ['', Validators.required],
      Graba_IVA: ['', Validators.required],
      Unidad_Medida_idUnidad_Medida: ['', Validators.required],
      IVA_idIVA: ['', Validators.required],
      Cantidad: ['', [Validators.required, Validators.min(1)]],
      Valor_Compra: ['', [Validators.required, Validators.min(0)]],
      Valor_Venta: ['', [Validators.required, Validators.min(0)]],
      Proveedores_idProveedores: ['', Validators.required]
    });*/
   
  //}
  grabar() {
    let producto: IProducto = {
      Codigo_Barras: this.frm_Producto.get('Codigo_Barras')?.value,
      Nombre_Producto: this.frm_Producto.get('Nombre_Producto')?.value,
      Graba_IVA: this.frm_Producto.get('Graba_IVA')?.value,
      Unidad_Medida_idUnidad_Medida: this.frm_Producto.get('Unidad_Medida_idUnidad_Medida')?.value,
      IVA_idIVA: this.frm_Producto.get('IVA_idIVA')?.value,
      Cantidad: this.frm_Producto.get('Cantidad')?.value,
      Valor_Compra: this.frm_Producto.get('Valor_Compra')?.value,
      Valor_Venta: this.frm_Producto.get('Valor_Venta')?.value,
      Proveedores_idProveedores: this.frm_Producto.get('Proveedores_idProveedores')?.value
    };

    if (this.idProducto == 0 || isNaN(this.idProducto)) {
      this.productoServicio.insertar(producto).subscribe((respuesta) => {
        
        if (parseInt(respuesta) > 0) {
          alert('Factura grabada');
          this.navegacion.navigate(['/productos']);
        }
      });
    } else {
      producto.idProductos = this.idProducto; // Corrección aquí
      this.productoServicio.actualizar(producto).subscribe((respuesta) => {
        if (parseInt(respuesta) > 0) {
          this.idProducto = 0;
          alert('Actualizado con éxito');
          this.navegacion.navigate(['/productos']);
        } else {
          alert('Error al actualizar');
        }
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUnidadMedida } from 'src/app/Interfaces/iunidadmedidas';
import { UnidadmedidaService } from '../../Services/unidadmedidas.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevaunidadmedidas',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './nuevaunidadmedidas.component.html',
  styleUrls: ['./nuevaunidadmedidas.component.scss'] // Corregido aquí
})
export class NuevaunidadmedidasComponent implements OnInit {
  titulo = 'Nueva Unidad de Medida';
  frm_UnidadMedida: FormGroup;
  idUnidadMedida: number = 0;

  constructor(
    private unidadService: UnidadmedidaService,
    private navegacion: Router,
    private ruta: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idUnidadMedida = parseInt(this.ruta.snapshot.paramMap.get('id') || '0');
    this.frm_UnidadMedida = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required]),
      stock: new FormControl('', [Validators.required])

    });

    if (this.idUnidadMedida > 0) {
      this.unidadService.uno(this.idUnidadMedida).subscribe((unidad) => {
        this.frm_UnidadMedida.patchValue({
          nombre: unidad.nombre,
          descripcion: unidad.descripcion,
          precio: unidad.precio,
          stock: unidad.stock
    
        });
        this.titulo = 'Actualizar Unidad de Medida';
      });
    }
  }

  

  limpiarcaja(): void {
    alert('Limpiar Caja');
  }

  grabar(): void {
    let unidadmedida: IUnidadMedida = {
      nombre: this.frm_UnidadMedida.get('nombre')?.value,
      descripcion: this.frm_UnidadMedida.get('descripcion')?.value,
      precio: this.frm_UnidadMedida.get('precio')?.value,
      stock: this.frm_UnidadMedida.get('stock')?.value
    
    };

    if (this.idUnidadMedida === 0) {
      this.unidadService.insertar(unidadmedida).subscribe(() => {
        Swal.fire('Éxito', 'La unidad de medida se grabó con éxito', 'success');
        this.navegacion.navigate(['/unidadmedida']);
      });
    } else {
      unidadmedida.producto_id  = this.idUnidadMedida;
      this.unidadService.actualizar(unidadmedida).subscribe(() => {
        Swal.fire('Éxito', 'La unidad de medida se modificó con éxito', 'success');
        this.navegacion.navigate(['/unidadmedida']);
      });
    }
  }
}

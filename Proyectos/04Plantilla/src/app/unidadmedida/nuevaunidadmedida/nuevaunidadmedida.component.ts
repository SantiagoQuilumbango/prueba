import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUnidadMedida } from 'src/app/Interfaces/iunidadmedida';
import { UnidadmedidaService } from '../../Services/unidadmedida.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevaunidadmedida',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './nuevaunidadmedida.component.html',
  styleUrls: ['./nuevaunidadmedida.component.scss'] // Corregido aquí
})
export class NuevaunidadmedidaComponent implements OnInit {
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
      apellido: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required])

    });

    if (this.idUnidadMedida > 0) {
      this.unidadService.uno(this.idUnidadMedida).subscribe((unidad) => {
        this.frm_UnidadMedida.patchValue({
          nombre: unidad.nombre,
          apellido: unidad.apellido,
          email: unidad.email,
          telefono: unidad.telefono
    
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
      apellido: this.frm_UnidadMedida.get('apellido')?.value,
      email: this.frm_UnidadMedida.get('email')?.value,
      telefono: this.frm_UnidadMedida.get('telefono')?.value
    
    };

    if (this.idUnidadMedida === 0) {
      this.unidadService.insertar(unidadmedida).subscribe(() => {
        Swal.fire('Éxito', 'La unidad de medida se grabó con éxito', 'success');
        this.navegacion.navigate(['/unidadmedida']);
      });
    } else {
      unidadmedida.cliente_id = this.idUnidadMedida;
      this.unidadService.actualizar(unidadmedida).subscribe(() => {
        Swal.fire('Éxito', 'La unidad de medida se modificó con éxito', 'success');
        this.navegacion.navigate(['/unidadmedida']);
      });
    }
  }
}


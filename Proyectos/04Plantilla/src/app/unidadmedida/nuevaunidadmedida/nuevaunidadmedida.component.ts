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
      Detalle: new FormControl('', [Validators.required]),
      Tipo: new FormControl('', [Validators.required])
    });

    if (this.idUnidadMedida > 0) {
      this.unidadService.uno(this.idUnidadMedida).subscribe((unidad) => {
        this.frm_UnidadMedida.patchValue({
          Detalle: unidad.Detalle,
          Tipo: unidad.Tipo
        });
        this.titulo = 'Actualizar Unidad de Medida';
      });
    }
  }

  cambio(objetoSelect: any): void {
    this.frm_UnidadMedida.get('Tipo')?.setValue(objetoSelect.target.value);
  }

  limpiarcaja(): void {
    alert('Limpiar Caja');
  }

  grabar(): void {
    let unidadmedida: IUnidadMedida = {
      Detalle: this.frm_UnidadMedida.get('Detalle')?.value,
      Tipo: this.frm_UnidadMedida.get('Tipo')?.value
    };

    if (this.idUnidadMedida === 0) {
      this.unidadService.insertar(unidadmedida).subscribe(() => {
        Swal.fire('Éxito', 'La unidad de medida se grabó con éxito', 'success');
        this.navegacion.navigate(['/unidadmedida']);
      });
    } else {
      unidadmedida.idUnidad_Medida = this.idUnidadMedida;
      this.unidadService.actualizar(unidadmedida).subscribe(() => {
        Swal.fire('Éxito', 'La unidad de medida se modificó con éxito', 'success');
        this.navegacion.navigate(['/unidadmedida']);
      });
    }
  }
}


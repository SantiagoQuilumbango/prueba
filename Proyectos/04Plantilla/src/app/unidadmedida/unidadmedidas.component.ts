import { Component, OnInit } from '@angular/core';
import { IUnidadMedida } from '../Interfaces/iunidadmedidas';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../theme/shared/shared.module';
import { UnidadmedidaService } from '../Services/unidadmedidas.service';

@Component({
  selector: 'app-unidadmedida',
  standalone: true,
  imports: [RouterLink, SharedModule],
  templateUrl: './unidadmedidas.component.html',
  styleUrl: './unidadmedidas.component.scss'
})
export class UnidadmedidasComponent implements OnInit {
  listaunidades: IUnidadMedida[] = [];

  constructor(private unidadServicio: UnidadmedidaService) {}
  ngOnInit(): void {
    this.unidadServicio.todos().subscribe((data) => {
      this.listaunidades = data;
    });
    //2
    this.cargatabla();
  }
  //1
  cargatabla() {
    this.unidadServicio.todos().subscribe((data) => {
      this.listaunidades = data;
    });
  }
  //eliminar(idFactura) {}
  //?
  eliminar(producto_id :number) {
    this.unidadServicio.eliminar(producto_id ).subscribe((data) => {
      this.cargatabla();
    });
  }
}
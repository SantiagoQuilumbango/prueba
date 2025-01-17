import { Component, OnInit } from '@angular/core';
import { IUnidadMedida } from '../Interfaces/iunidadmedida';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../theme/shared/shared.module';
import { UnidadmedidaService } from '../Services/unidadmedida.service';

@Component({
  selector: 'app-unidadmedida',
  standalone: true,
  imports: [RouterLink, SharedModule],
  templateUrl: './unidadmedida.component.html',
  styleUrl: './unidadmedida.component.scss'
})
export class UnidadmedidaComponent implements OnInit {
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
  eliminar(cliente_id:number) {
    this.unidadServicio.eliminar(cliente_id).subscribe((data) => {
      this.cargatabla();
    });
  }
}


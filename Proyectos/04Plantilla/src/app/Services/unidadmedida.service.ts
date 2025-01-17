import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUnidadMedida } from '../Interfaces/iunidadmedida';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnidadmedidaService {
  apiurl = 'http://localhost/tarea1s6/Proyectos/03MVC/controllers/unidadmedida.controller.php?op=';

  constructor(private lector: HttpClient) {}

  todos(): Observable<IUnidadMedida[]> {
    return this.lector.get<IUnidadMedida[]>(this.apiurl + 'todos');
  }

  uno(idUnidad: number): Observable<IUnidadMedida> {
    const formData = new FormData();
    formData.append('idUnidad', idUnidad.toString());
    return this.lector.post<IUnidadMedida>(this.apiurl + 'uno', formData);
  }

  eliminar(idUnidad: number): Observable<number> {
    const formData = new FormData();
    formData.append('idUnidad', idUnidad.toString());
    return this.lector.post<number>(this.apiurl + 'eliminar', formData);
  }

  insertar(unidad: IUnidadMedida): Observable<string> {
    const formData = new FormData();
    //formData.append('Descripcion', unidad.nombre);
    formData.append('nombre', unidad.nombre);
    formData.append('apellido', unidad.apellido);
    formData.append('email', unidad.email);
    formData.append('telefono', unidad.telefono);
    
    return this.lector.post<string>(this.apiurl + 'insertar', formData);
  }

  actualizar(unidad: IUnidadMedida): Observable<string> {
    const formData = new FormData();
    formData.append('idUnidad', unidad.cliente_id.toString());
    formData.append('nombre', unidad.nombre);
    formData.append('apellido', unidad.apellido);
    formData.append('email', unidad.email);
    formData.append('telefono', unidad.telefono);
   
    return this.lector.post<string>(this.apiurl + 'actualizar', formData);
  }
}

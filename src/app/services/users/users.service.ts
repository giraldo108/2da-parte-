import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '@core/models/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  urlBaseServices: string = URL_SERVICIOS;

  constructor(private readonly http: HttpClient) { }

  //  Crear usuario
  createUser(userData: any): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/users/create`;
    return this.http.post<any>(endpoint, userData);
  }

  //  Actualizar usuario
  updateUser(userId: number, userData: any): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/users/update/${userId}`;
    return this.http.put<any>(endpoint, userData);
  }

  //  Eliminar usuario
  deleteUser(userId: number): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/users/delete/${userId}`;
    return this.http.delete<any>(endpoint);
  }

  //  Obtener usuarios del administrador autenticado (requiere token)
   getAllUserByAdministrator(id: number, filters?: any): Observable<any> {
  const endpoint = `${this.urlBaseServices}/api/v1/users/:id`;
  const params = new HttpParams({
    fromObject: {
      nombre: filters?.name || '',
      email: filters?.email || ''
    }
  });
  return this.http.get<any>(endpoint, { params });
}


  //  Obtener todos los administradores (rol_id = 1)
  getAllAdministrator(): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/users/rol/1`;
    return this.http.get<any>(endpoint);
  }

  //  Obtener todos los usuarios (rol_id = 2)
  getAllUsers(): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/users/rol/2`;
    return this.http.get<any>(endpoint);
  }

}

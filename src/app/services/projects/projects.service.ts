// Importaciones necesarias desde Angular y RxJS
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '@core/models/config';
import { Observable } from 'rxjs';
import { AuthService } from '@core/service/auth.service';

/**
 * Servicio para gestión de proyectos
 * Proporciona métodos para CRUD de proyectos y consultas específicas
 */
@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  // URL base de la API (configurada en los archivos de entorno)
  private readonly urlBaseServices: string = URL_SERVICIOS;

  constructor(
    private readonly http: HttpClient,
    private authService: AuthService
  ) { }

  //servicio para validar el token 
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken(); // Método para obtener el token
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  /**
   * Crea un nuevo proyecto en el sistema
   */
  createProject(projectData: any): Observable<any> {
    // 1. Obtener el token del localStorage
    const headers = this.getHeaders();
    const endpoint = `${this.urlBaseServices}/api/v1/projects`;
    return this.http.post<any>(endpoint, projectData);
  }

  /**
   * Actualiza un proyecto existente
   * @param projectId - ID del proyecto a actualizar
   * @param projectData - Objeto con los nuevos datos del proyecto
   * @returns Observable con la respuesta del servidor
   */
  updateProject(projectId: number, projectData: any): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/projects/${projectId}`;
    return this.http.put<any>(endpoint, projectData);
  }

  /**
   * Elimina un proyecto del sistema
   * @param projectId - ID del proyecto a eliminar
   * @returns Observable con la respuesta del servidor
   */
  
  deleteProject(projectId: number): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/projects/${projectId}`;
    return this.http.delete<any>(endpoint);
  }

  /**
   * Obtiene proyectos filtrados por administrador
   * @param id - ID del administrador
   * @param filters - Objeto opcional con filtros de búsqueda
   * @returns Observable con el listado de proyectos
   */
  getAllProjectsByAdministrator(id: number, filters?: any): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/projects`;
    const params = new HttpParams({
      fromObject: {
        nombre: filters?.name || '',    // Filtro por nombre de proyecto
        estado: filters?.status || '' ,
        administrador_id: filters?.administrador_id || '' // si estás filtrando también por admin
      }
    });
    return this.http.get<any>(endpoint, { params });
  }

  

assignUsersToProject(projectId: number, userIds: number[]): Observable<any> {
  const endpoint = `${this.urlBaseServices}/api/v1/projects/${projectId}/users`;
  return this.http.post(endpoint, { user_ids: userIds }, { headers: this.getHeaders() });
}

removeUserFromProject(projectId: number, userId: number): Observable<any> {
  const endpoint = `${this.urlBaseServices}/api/v1/projects/${projectId}/users/${userId}`;
  return this.http.delete(endpoint, { headers: this.getHeaders() });
}

}

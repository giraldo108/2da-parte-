// Importa el decorador Injectable desde el módulo '@angular/core'. Este decorador marca una clase como disponible para ser proporcionada y utilizada como una dependencia a través del sistema de inyección de dependencias de Angular.
import { Injectable } from '@angular/core';
// Aplica el decorador Injectable a la clase ProjectsService
@Injectable({
  providedIn: 'root'
})
// Define la clase ProjectsService y la exporta para que pueda ser utilizada en otras partes de la aplicación.

export class ProjectsService {

  constructor() { }
}

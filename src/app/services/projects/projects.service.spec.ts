// Importa la clase TestBed del módulo de pruebas de Angular. TestBed es esencial para configurar y manipular el entorno de pruebas unitarias.
import { TestBed } from '@angular/core/testing';
// Importa la clase ProjectsService desde el archivo './projects.service'. Este es el servicio que se va a probar en este archivo.
import { ProjectsService } from './projects.service';
// Define un bloque de pruebas llamado 'ProjectsService'. La función 'describe' de Jasmine se utiliza para agrupar pruebas relacionadas bajo un nombre descriptivo.
describe('ProjectsService', () => {
  let service: ProjectsService;
// Define un bloque 'beforeEach'. La función dentro de 'beforeEach' se ejecuta antes de cada prueba ('it') dentro de este bloque 'describe'.
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectsService);
  });
// Define una prueba individual con la descripción 'should be created'. La función 'it' define una especificación de prueba.
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

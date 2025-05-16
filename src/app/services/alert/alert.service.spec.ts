import { TestBed } from '@angular/core/testing';

import { AlertService } from './alert.service';
// Define un bloque de pruebas llamado 'AlertService'. La función 'describe' de Jasmine se utiliza para agrupar pruebas relacionadas bajo un nombre descriptivo.
describe('AlertService', () => {
  let service: AlertService;
// Define un bloque 'beforeEach'. La función dentro de 'beforeEach' se ejecuta antes de cada prueba ('it') dentro de este bloque 'describe'.
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertService);
  });
// Define una prueba individual con la descripción 'should be created'. La función 'it' define una especificación de prueba.
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

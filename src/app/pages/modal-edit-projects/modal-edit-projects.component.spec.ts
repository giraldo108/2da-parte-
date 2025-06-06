import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditProjectsComponent } from './modal-edit-projects.component';
// Define un bloque de pruebas llamado 'ModalEditProjectsComponent'. La función 'describe' de Jasmine se utiliza para agrupar pruebas relacionadas con este componente.
describe('ModalEditProjectsComponent', () => {
  let component: ModalEditProjectsComponent;
  let fixture: ComponentFixture<ModalEditProjectsComponent>;
// Define un bloque 'beforeEach'. La función dentro de 'beforeEach' se ejecuta antes de cada prueba ('it') dentro de este bloque 'describe'. El 'async' indica que puede haber operaciones asíncronas dentro.
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEditProjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
// Define una prueba individual con la descripción 'should create'. La función 'it' define una especificación de prueba.
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
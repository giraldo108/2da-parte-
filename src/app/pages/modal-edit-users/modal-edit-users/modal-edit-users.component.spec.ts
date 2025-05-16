import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditUsersComponent } from './modal-edit-users.component';
// Define un bloque de pruebas llamado 'ModalEditUsersComponent'. La función 'describe' de Jasmine se utiliza para agrupar pruebas relacionadas con este componente.
describe('ModalEditUsersComponent', () => {
  let component: ModalEditUsersComponent;
  let fixture: ComponentFixture<ModalEditUsersComponent>;
// Define un bloque 'beforeEach'. La función dentro de 'beforeEach' se ejecuta antes de cada prueba ('it') dentro de este bloque 'describe'. El 'async' indica que puede haber operaciones asíncronas dentro.
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEditUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
// Define una prueba individual con la descripción 'should create'. La función 'it' define una especificación de prueba.
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

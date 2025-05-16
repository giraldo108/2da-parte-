import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateUserComponent } from './modal-create-user.component';
// Define un bloque de pruebas llamado 'ModalCreateUserComponent'. La función 'describe' de Jasmine se utiliza para agrupar pruebas relacionadas con este componente.
describe('ModalCreateUserComponent', () => {
  let component: ModalCreateUserComponent;
  let fixture: ComponentFixture<ModalCreateUserComponent>;
// Define un bloque 'beforeEach'. La función dentro de 'beforeEach' se ejecuta antes de cada prueba ('it') dentro de este bloque 'describe'. El 'async' indica que puede haber operaciones asíncronas dentro.
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCreateUserComponent]
    })
    .compileComponents();
// Crea una instancia del componente ModalCreateUserComponent y su plantilla asociada. La 'fixture' ahora contiene el componente.
    fixture = TestBed.createComponent(ModalCreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
// Define una prueba individual con la descripción 'should create'. La función 'it' define una especificación de prueba.
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

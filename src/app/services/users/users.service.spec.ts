// Importa la clase TestBed del módulo de pruebas de Angular. TestBed se utiliza para configurar y crear el entorno de pruebas.
import { TestBed } from '@angular/core/testing'; 
// Importa la clase UsersService desde el archivo './users.service'. Este es el servicio que se va a probar.
import { UsersService } from './users.service'; 
// Define un bloque de pruebas llamado 'UsersService'. La función describe se utiliza para agrupar pruebas relacionadas.
describe('UsersService', () => {
// Declara una variable 'service' de tipo UsersService. Esta variable almacenará la instancia del servicio que se va a probar.
  let service: UsersService;
// Define un bloque beforeEach. La función dentro de beforeEach se ejecuta antes de cada prueba (cada bloque 'it') dentro de este 'describe'.
  beforeEach(() => {
    // Configura el entorno de pruebas utilizando TestBed. En este caso, el objeto vacío indica una configuración básica sin módulos o proveedores específicos.
    TestBed.configureTestingModule({});
    // Inyecta una instancia del UsersService utilizando TestBed.inject() y la asigna a la variable 'service'. Esto simula cómo Angular inyectaría el servicio en un componente o en otro servicio.
    service = TestBed.inject(UsersService);
  });
// Define una prueba individual con la descripción 'should be created'. La función it contiene las aserciones que verifican el comportamiento esperado.
  it('should be created', () => {
    // Realiza una aserción utilizando la función expect(). Aquí, se espera que la variable 'service' sea truthy, lo que significa que la instancia del servicio se ha creado correctamente y no es null o undefined.
    expect(service).toBeTruthy();
  });
});

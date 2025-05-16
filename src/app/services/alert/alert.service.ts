// Importa el decorador Injectable desde el núcleo de Angular. Este decorador marca la clase AlertService como un servicio que puede ser inyectado en otras partes de la aplicación.
import { Injectable } from '@angular/core';
 // Importa las clases y tipos necesarios del módulo MatSnackBar de Angular Material para mostrar notificaciones.
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
// Aplica el decorador Injectable a la clase AlertService.
@Injectable({
  providedIn: 'root'
})
// Define la clase AlertService, que encapsula la lógica para mostrar notificaciones al usuario.
export class AlertService {

  constructor(private _snackBar: MatSnackBar) { }
 // Define el método showNotification, que se utiliza para mostrar la notificación.
  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition = 'bottom',
    placementAlign: MatSnackBarHorizontalPosition = 'center'
  ) {
    // Llama al método open del servicio MatSnackBar para mostrar la notificación. El segundo argumento es una acción (aquí está vacío, ''), y el tercer argumento es un objeto de configuración.
    this._snackBar.open(text, '', {
      duration: 5000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}

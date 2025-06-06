import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { UsersService } from 'app/services/users/users.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { invalid } from 'moment';
import Swal from 'sweetalert2';

 // El decorador @Component define esta clase como un componente de Angular.
@Component({
  selector: 'app-modal-create-user',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatDialogModule, MatButtonModule, MatSelectModule, MatIconModule, MatFormFieldModule,
    MatInputModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, ReactiveFormsModule
  ],
  templateUrl: './modal-create-user.component.html',
  styleUrls: ['./modal-create-user.component.scss']
})

// Exporta la clase ModalCreateUserComponent e implementa la interfaz OnInit para el ciclo de vida del componente.
export class ModalCreateUserComponent implements OnInit {
  // Declara una variable para el formulario reactivo de creación de usuarios. El signo '!' indica que se inicializará en el constructor.
  formCreateUser!: FormGroup;
  // Declara un array para almacenar los valores de los administradores, probablemente para un campo de selección.
  administratorsValues: any[] = [];
  // Declara una variable booleana para controlar la visibilidad del campo de administrador en el formulario.
  showFieldAdministrator: boolean = false;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly _formBuilder: FormBuilder,
    private readonly _userService: UsersService,
    private readonly _dialogRef: MatDialogRef<ModalCreateUserComponent>,
    private readonly _snackBar: MatSnackBar,

  )

  {
    // Llama al método para crear el formulario de creación al inicializar el componente.
    this.createFormUsers();
    this.formCreateUser.controls['confirmPassword'].valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((value) => {
      this.validatePassword(value);
    });
  }
// Método del ciclo de vida de Angular que se ejecuta después de que se inicializa el constructor y se enlazan las propiedades de entrada.
  ngOnInit(): void {
    this.getAllAdministrator();
  }
  // Método para crear el formulario reactivo para la creación de usuarios.
  createFormUsers() {
    this.formCreateUser = this._formBuilder.group({
      nombre: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      rol_id: ['', Validators.required],
      administrador_id: [undefined, Validators.required]
    });
  }
// Método para obtener la lista de todos los administradores del backend.
  getAllAdministrator() {
    this._userService.getAllAdministrator().subscribe({
      next: (res) => {
        console.log('Respuesta administradores:', res);
        this.administratorsValues = res.users;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
// Método que se llama cuando cambia el valor del control 'rol_id' en el formulario.
  onChangeRole(event: any) {
    console.log('Rol seleccionado:', event.value);
    if (event.value === '1') { 
       this.hideAdministratorField();
      
    } else {
     
     this.showAdministratorField();
    }
  }
  
// Método que se llama cuando se envía el formulario de creación de usuarios.
  onSubmit() {
    if (this.formCreateUser.invalid) {
      Swal.fire('Error', 'Por favor completa los campos', 'error');
      return;
    }
 // Valida nuevamente la contraseña al enviar el formulario para asegurar la consistencia.
    this.validatePassword(this.formCreateUser.get('password')?.value);
    const userDataInformation = {
      nombre: this.formCreateUser.get('nombre')?.value,
      email: this.formCreateUser.get('email')?.value,
      password: this.formCreateUser.get('password')?.value,
      rol_id: Number(this.formCreateUser.get('rol_id')?.value),
      administrador_id: this.formCreateUser.get('administrador_id')?.value
    };
    
    // Enviar la información del usuario al servicio
    this._userService.createUser(userDataInformation).subscribe({
      next: (response) => {
        this._snackBar.open(response.message, 'Cerrar', { duration: 5000 });
        this.formCreateUser.reset();
        this._dialogRef.close(true);
      },
      error: (error) => {
        const errorMessage = error.error?.result || 'Ocurrió un error inesperado. Por favor, intenta nuevamente.';
        this._snackBar.open(errorMessage, 'Cerrar', { duration: 5000 });
      }
    });
  }
  
  //validatePassword es un método que valida si la contraseña y la confirmación de contraseña son iguales
  private validatePassword(confirmPassword: string) {
    const password = this.formCreateUser.get('password')?.value;
    if (password !== confirmPassword) {
      this.formCreateUser.get('confirmPassword')?.setErrors({ invalid: true });
    } else {
      this.formCreateUser.get('confirmPassword')?.setErrors(null);
    }
  }

  //showAdministratorField y hideAdministratorField son métodos que muestran u ocultan el campo de administrador en el formulario
  // dependiendo del rol seleccionado en el formulario
  private showAdministratorField() {
    this.showFieldAdministrator = true;
    this.formCreateUser.get('administrador_id')?.setValidators([Validators.required]);
    this.formCreateUser.get('administrador_id')?.updateValueAndValidity();
  }
  
  private hideAdministratorField() {
    this.showFieldAdministrator = false;
    this.formCreateUser.get('administrador_id')?.clearValidators();
    this.formCreateUser.get('administrador_id')?.setValue(undefined);
  }
  
}
    
    
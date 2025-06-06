// Importaciones necesarias desde Angular y Angular Material

import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { ProjectsService } from 'app/services/projects/projects.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import Swal from 'sweetalert2';
import { UsersService } from 'app/services/users/users.service';
import { AuthService } from '@core/service/auth.service';

// Decorador que define el componente como standalone y configura los módulos necesarios

@Component({
  selector: 'app-modal-create-project',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatDialogModule, 
    MatButtonModule, 
    MatSelectModule, 
    MatIconModule, 
    MatFormFieldModule,
    MatInputModule, 
    MatDialogActions, 
    MatDialogClose, 
    MatDialogTitle, 
    MatDialogContent, 
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './modal-create-project.component.html',
  styleUrls: ['./modal-create-project.component.scss']
})
// Clase del componente que implementa OnInit para ejecutar lógica al iniciarse

export class ModalCreateProjectComponent  implements OnInit {
  formCreateProject!: FormGroup;
  administratorsValues: any[] = [];
  statusOptions: string[] = ['active', 'inactive', 'completed'];
  // Inyección de dependencias

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly _formBuilder: FormBuilder,
    private readonly _projectService: ProjectsService,
    private readonly _dialogRef: MatDialogRef<ModalCreateProjectComponent>,
    private readonly _snackBar: MatSnackBar,
    private readonly _authService: AuthService,
    private readonly _userService: UsersService

  ) {
    this.createFormProjects();
  }

    // Se ejecuta al inicializar el componente

  ngOnInit(): void {
    this.getAllAdministrator();
  }
  // Crea el formulario con validadores requeridos para los campos

  createFormProjects() {
    this.formCreateProject = this._formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      administrador_id: ['',Validators.required]

    });
  }
  // Llama al servicio de usuarios para obtener todos los administradores

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
  // Función que se llama al enviar el formulario

  onSubmit() {
    if (this.formCreateProject.invalid) {
      Swal.fire('Error', 'Por favor completa los campos requeridos', 'error');
      return;
    }

    // Se extraen los valores del formulario

    const projectData = {
      nombre: this.formCreateProject.get('nombre')?.value,
      descripcion: this.formCreateProject.get('descripcion')?.value,
      administrador_id: this.formCreateProject.get('administrador_id')?.value
    };
    // Se envía la información al backend a través del servicio

    this._projectService.createProject(projectData).subscribe({
      next: (response) => {
                // Si se crea correctamente, se muestra un snackbar y se cierra el modal

        this._snackBar.open(response.message, 'Cerrar', { duration: 5000 });
        this._dialogRef.close(true);
      },
      error: (error) => {
                // Si ocurre un error, se muestra un mensaje adecuado

        const errorMessage = error.error?.message || 'Ocurrió un error al crear el proyecto. Por favor, intenta nuevamente.';
        this._snackBar.open(errorMessage, 'Cerrar', { duration: 5000 });
      }
    });
  }
}
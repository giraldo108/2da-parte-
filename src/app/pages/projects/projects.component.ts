// Importaciones necesarias de Angular, Angular Material y otros módulos
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProjectsService } from 'app/services/projects/projects.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalCreateProjectComponent } from 'app/pages/modal-create-project/modal-create-project.component';
import { ModalEditProjectsComponent } from 'app/pages/modal-edit-projects/modal-edit-projects.component';
import { debounceTime, distinctUntilChanged } from 'rxjs';
// Interfaz que representa un proyecto
export interface Project {
  name: string;
  status: string;
}
// Decorador del componente
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatInputModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatIconModule,
    MatPaginatorModule,
    MatButtonModule,
    MatTableModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
// Columnas que se mostrarán en la tabla
  displayedColumns: string[] = [  
    'name',
    'description',
    'status',
    'action'
  ];

  breadscrums = [
    {
      title: 'Gestión de proyectos',
      item: [],
      active: 'Listado de proyectos',
    },
  ];

  // Table de datos
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  // Filtro de búsqueda
  projectFormSearchFilter!: FormGroup;
  projectsList: any[] = [];
// Indicador de carga
  isLoading = false;
// Valores por defecto del filtro
  projectDefaultFilterSearch: any = {
    name: undefined,
    status: undefined,
  }
// Inyección de dependencias
  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly projectService: ProjectsService,
    private readonly dialogModel: MatDialog,
    private readonly _sanckBar: MatSnackBar
  ) { }
  // Inicialización del componente
  ngOnInit(): void {
    this.createProjectFormSearchFilter();
    this.getAllProjectsByAdministrator();
    this.handleProjectFilterChance('name', 'name');
    this.handleProjectFilterChance('status', 'status');
  }
// Crea el formulario reactivo para los filtros
  createProjectFormSearchFilter() {
    this.projectFormSearchFilter = this._formBuilder.group({
      name: [''],
      status: ['']
    });
  }

  // Conversor de estados
  getStatusName(status: string): string {
    switch (status) {
      case 'active':
        return 'Activo';
      case 'inactive':
        return 'Inactivo';
      case 'completed':
        return 'Completado';
      default:
        return 'Desconocido';
    }
  }

  // Escucha cambios en los filtros
  handleProjectFilterChance(controlName: string, filterKey: string) {
    this.projectFormSearchFilter.controls[controlName].valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((value: any) => {
      this.projectDefaultFilterSearch[filterKey] = value;
      this.getAllProjectsByAdministrator({ ...this.projectDefaultFilterSearch, [filterKey]: value });
    });
  }
  // Consulta todos los proyectos del administrador con posibles filtros
  getAllProjectsByAdministrator(filters?: any): void {
    this.isLoading = true;
    this.projectService.getAllProjectsByAdministrator(1, filters).subscribe({
      next: (response) => {
        this.projectsList = response.projects;
        this.dataSource.data = response.projects;
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
      }
    });
  }
// Abre el modal para crear un proyecto nuevo
  openModalCreateProject(): void {
    const dialogRef = this.dialogModel.open(ModalCreateProjectComponent, {
      minWidth: '300px',
      maxWidth: '1000px',
      width: '820px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllProjectsByAdministrator();
      }
    });
  }
// Abre el modal para ver la información de un proyecto (modo solo lectura)
  viewProject(projectInformation: any): void {
  const dialogRef = this.dialogModel.open(ModalEditProjectsComponent, {
    minWidth: '300px',
    maxWidth: '1000px',
    width: '820px',
    disableClose: true,
    data: { project: projectInformation, isView: true } 
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.getAllProjectsByAdministrator();
    }
  }); 
}

// Abre el modal para editar un proyecto
  openModalUpdateProject(projectInformation: any): void {
    const dialogRef = this.dialogModel.open(ModalEditProjectsComponent, {
      minWidth: '300px',
      maxWidth: '1000px',
      width: '820px',
      disableClose: true,
      data: { project: projectInformation }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllProjectsByAdministrator();
      }
    }); 
  }
// Elimina un proyecto y muestra notificación
  deleteProject(projectId: number): void {
    this.projectService.deleteProject(projectId).subscribe({
      next: (response) => {
        this._sanckBar.open(response.message, 'Cerrar', { duration: 5000 });
        this.getAllProjectsByAdministrator();
      },
      error: (error) => {
        const errorMessage = error.error?.message || 'Error al eliminar el proyecto';
        this._sanckBar.open(errorMessage, 'Cerrar', { duration: 5000 });
      }
    });
  }
}
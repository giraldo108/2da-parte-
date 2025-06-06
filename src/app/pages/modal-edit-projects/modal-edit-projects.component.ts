import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectsService } from 'app/services/projects/projects.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-modal-edit-projects',
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
  templateUrl: './modal-edit-projects.component.html',
  styleUrls: ['./modal-edit-projects.component.scss']
})
export class ModalEditProjectsComponent {
  formUpdateProjects!: FormGroup;
 
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly _formBuilder: FormBuilder,
    private readonly _snackBar: MatSnackBar,
    private readonly _projectService: ProjectsService,
    private readonly dialogRef: MatDialogRef<ModalEditProjectsComponent>
    
  ) {
    this.updateFormProjects();
    
  }

  ngOnInit() {
    if (this.data?.project) {
      this.loadProjectData(this.data.project);
    }
  }

  updateFormProjects() {
    this.formUpdateProjects = this._formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  loadProjectData(project: any) {
    this.formUpdateProjects.patchValue({
      nombre: project.nombre,
      descripcion: project.descripcion,
    });
  }

  updateProject() {
    if (this.formUpdateProjects.valid) {
      const projectData = this.formUpdateProjects.value;
      const projectId = this.data?.project?.id;

      this._projectService.updateProject(projectId, projectData).subscribe({
        next: (response) => {
          this._snackBar.open(response.message, 'Cerrar', { duration: 5000 });
          this.dialogRef.close(true);
        },
        error: (error) => {
          const errorMessage = error.error?.result || 'Ocurrió un error al actualizar el proyecto. Por favor, intenta nuevamente.';
          this._snackBar.open(errorMessage, 'Cerrar', { duration: 5000 });
        }
      });
    }
  }
}
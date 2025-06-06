import { Component, Inject, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectsService } from '../../services/projects/projects.service';
import { UsersService } from '../../services/users/users.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-modal-assign-users-projects',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule
    
  ],
  templateUrl: './modal-assign-users-projects.component.html',
  styleUrl: './modal-assign-users-projects.component.scss'
})

export class ModalAssignUsersProjectsComponent implements OnInit {
  usersControl = new FormControl([]);
  allUsers: any[] = [];

  constructor(
    private projectService: ProjectsService,
    private usersService: UsersService,
    public dialogRef: MatDialogRef<ModalAssignUsersProjectsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { projectId: number }
  ) {}

  ngOnInit(): void {
    this.loadAllUsers();
  }

  loadAllUsers() {
    this.usersService.getAllUsers().subscribe(res => {
      this.allUsers = res;
    });
  }

  assignUsers() {
    const selectedUserIds = this.usersControl.value ?? [];
    this.projectService.assignUsersToProject(this.data.projectId, selectedUserIds).subscribe({
      next: () => {
        console.log('Usuarios asignados correctamente');
        this.dialogRef.close(true);
      },
      error: err => {
        console.error('Error al asignar usuarios', err);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
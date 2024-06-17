import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../../services/Users/users.service';
import { AsyncPipe, NgForOf } from '@angular/common';
import { UserCardComponent } from '../user-card/user-card.component';
import { MatButton } from '@angular/material/button';
import { AddUserCardComponent } from '../add-user-card/add-user-card.component';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../models/user.models';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    AsyncPipe,
    UserCardComponent,
    NgForOf,
    MatButton
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit {
  private userService = inject(UsersService);
  public users$ = this.userService.users$;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.userService.loadUsers();
  }

  userDeleted(id: number): void {
    this.userService.userDeleted(id);
  }

  public openAddDialog(): void {
    const dialogWindow = this.dialog.open(AddUserCardComponent, {
      width: '40%',
      data: {
        isEdit: false,
        title: 'Add User'
      }
    });
    dialogWindow.afterClosed().subscribe(result => {
      console.log('res', result);
      if (result) {
        this.userService.addUser(result);
      }
    });
  }

  openEditUserDialog(user: User): void {
    const dialogWindow = this.dialog.open(AddUserCardComponent, {
      width: '40%',
      data: user,
    });
    dialogWindow.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.editUser(result);
      }
    });
    console.log(this.openEditUserDialog);
  }
}

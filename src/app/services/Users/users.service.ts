import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../models/user.models';
import { UsersApiService } from '../UsersApi/users-api.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly KEY_ITEM = 'users';
  public usersSubject = new BehaviorSubject<User[]>([]);
  public readonly users$ = this.usersSubject.asObservable();
  private UsersApi = inject(UsersApiService);

  constructor() {
  }

  public loadUsers(): void {
    const localUsers = localStorage.getItem(this.KEY_ITEM);
    if (localUsers && localUsers !== '[]') {
      this.usersSubject.next(JSON.parse((localUsers)));
    } else {
      this.UsersApi.getUsers().subscribe(
        data => {
          this.usersSubject.next(data);
          this.localStorageSetItems();
        }
      );
    }
  };

  public userDeleted(id: number): void {
    this.usersSubject.next(this.usersSubject.value.filter(user => user.id !== id));
    this.localStorageSetItems();
  }

  public addUser(user: User) {
    this.usersSubject.next([...this.usersSubject.value, user]);
    this.localStorageSetItems();
  }

  public editUser(updatedUser: User) {
    this.usersSubject.next(this.usersSubject.getValue()
      .map((user) => (user.id === updatedUser.id ? updatedUser : user)));
    this.localStorageSetItems();
    console.log('up', updatedUser, 'user', 'old', this.usersSubject.getValue());
  }

  private localStorageSetItems(): void {
    localStorage.setItem(
      this.KEY_ITEM,
      JSON.stringify(this.usersSubject.value),
    );
  }
}

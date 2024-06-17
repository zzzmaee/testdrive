import { inject, Injectable } from '@angular/core';
import { UsersService } from './Users/users.service';
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  public readonly KEY_ITEM = 'users';
  public usersService = inject(UsersService)
  public usersSubject$ = this.usersService.usersSubject

  public setItems(): void {
    localStorage.setItem(
      this.KEY_ITEM,
      JSON.stringify(this.usersSubject$.value),
    );
  }
}

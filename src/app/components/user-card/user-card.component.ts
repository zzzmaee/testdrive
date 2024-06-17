import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user.models';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  @Input() user!: User;
  @Output() userDeletedEvent = new EventEmitter<number>();
  @Output() editUsers = new EventEmitter<User>();

  userDeleted(): void {
    this.userDeletedEvent.emit(this.user.id);
  }

  userEdit() {
    this.editUsers.emit(this.user);
  }
}

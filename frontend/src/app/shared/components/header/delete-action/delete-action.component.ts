import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-delete-action',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './delete-action.component.html',
})
export class DeleteActionComponent {
  @Output() eventEmitter = new EventEmitter<void>();

  delete(): void {
    this.eventEmitter.emit();
  }
}

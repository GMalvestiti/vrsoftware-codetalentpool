import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-save-action',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './save-action.component.html',
})
export class SaveActionComponent {
  @Output() eventEmitter = new EventEmitter<void>();

  save(): void {
    this.eventEmitter.emit();
  }
}

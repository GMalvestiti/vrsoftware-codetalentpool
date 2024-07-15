import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cancel-action',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './cancel-action.component.html',
})
export class CancelActionComponent {
  @Output() eventEmitter = new EventEmitter<void>();

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
  ) {}

  cancel(): void {
    this.eventEmitter.emit();
  }
}

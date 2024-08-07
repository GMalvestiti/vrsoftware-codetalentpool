import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-action',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './add-action.component.html',
})
export class AddActionComponent {
  @Output() eventEmitter = new EventEmitter<void>();

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
  ) {}

  add(): void {
    this.eventEmitter.emit();
  }
}

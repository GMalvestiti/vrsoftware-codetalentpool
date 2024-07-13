import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from '../shared/components/layout/layout.component';

@Component({
  standalone: true,
  imports: [LayoutComponent, RouterOutlet],
  templateUrl: './pages.component.html',
})
export class PagesComponent {}

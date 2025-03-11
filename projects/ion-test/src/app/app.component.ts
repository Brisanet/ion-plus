import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { IonIconComponent } from '../../../ion/src/public-api';
import { IonSelectComponent } from '../../../ion/src/lib/select';
import { IonDropdownComponent } from '../../../ion/src/lib/directives/dropdown/dropdown.component';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    IonIconComponent,
    IonSelectComponent,
    IonDropdownComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ion-test';
}

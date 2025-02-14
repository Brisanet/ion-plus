import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { IonIconComponent } from '../../../ion/src/public-api';

@Component({
    selector: 'app-root',
    imports: [CommonModule, RouterOutlet, IonIconComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ion-test';
}

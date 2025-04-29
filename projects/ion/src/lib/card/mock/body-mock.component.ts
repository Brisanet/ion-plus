import { Component, input } from '@angular/core';

@Component({
  standalone: true,
  template: ` <p data-testid="ion-card-body">{{ text() }}</p> `,
  styles: [
    `
      p {
        padding: 24px;
        color: var(--ion-neutral-8);
      }
    `,
  ],
})
export class BodyMockComponent {
  text = input<string>(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor nisl nec nisl tincidunt, eget.'
  );
}

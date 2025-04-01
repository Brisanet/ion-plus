import { Component, inject } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';

import { IonButtonComponent } from '../lib/button';
import { IonModalService } from '../lib/modal';

@Component({
  standalone: true,
  template: `<ion-button label="Open modal" (ionOnClick)="openModal()" />`,
  imports: [IonButtonComponent],
})
export class ModalStoriesComponent {
  private readonly ionModalService = inject(IonModalService);

  protected openModal(): void {
    this.ionModalService.open(ModalTestComponent, {
      title: 'Meu Modal Feliz',
      preventCloseOnEscKey: true,
      disableClose: true,
      footer: {
        showDivider: true,
      },
    });
  }
}

@Component({
  standalone: true,
  template: `<p>Olá tudo bem?</p>`,
})
class ModalTestComponent {}

const meta: Meta<ModalStoriesComponent> = {
  title: 'Ion/Data Display/Modal',
  component: ModalStoriesComponent,
};

export default meta;
type Story = StoryObj<ModalStoriesComponent>;

export const Default: Story = {};

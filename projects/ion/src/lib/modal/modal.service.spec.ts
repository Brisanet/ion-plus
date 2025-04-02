import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { screen, within } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { firstValueFrom } from 'rxjs';
import { IonModalService } from './modal.service';

@Component({
  standalone: true,
  template: `<div>
    <p>{{ title }}</p>
  </div>`,
})
class TestModalComponent {
  @Input() title = '';
}

describe('IonModalService', () => {
  let service: IonModalService;
  let fixture: ComponentFixture<TestModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [IonModalService],
    });
    fixture = TestBed.createComponent(TestModalComponent);
    service = TestBed.inject(IonModalService);
  }));

  it('should open a modal with default values and component inside', () => {
    service.open(TestModalComponent);
    fixture.detectChanges();
    expect(screen.getByTestId('ion-modal')).toBeVisible();
    expect(screen.getByRole('heading', { name: /ion modal/i })).toBeVisible();
  });

  it('should set params to component inside modal', () => {
    service.open(TestModalComponent, {
      params: { title: 'Test' },
    });
    fixture.detectChanges();
    expect(screen.getByText('Test')).toBeVisible();
  });

  it('should emit action when header button is clicked', async () => {
    const { observable } = service.open(TestModalComponent, {
      headerButton: { label: 'Test', icon: { type: 'test' } },
    });
    fixture.detectChanges();
    if (observable) {
      const action = firstValueFrom(observable);
      await userEvent.click(screen.getByTestId('ion-button-Test'));
      await expect(action).resolves.toMatchObject({ action: 'onHeaderAction' });
    }
  });

  it('should emit action when close button is clicked', async () => {
    const { observable } = service.open(TestModalComponent);
    fixture.detectChanges();
    if (observable) {
      const action = firstValueFrom(observable);

      await userEvent.click(
        within(screen.getByTestId('close-btn')).getByRole('button')
      );
      await expect(action).resolves.toMatchObject({ action: 'onClose' });
    }
  });

  it('should emit action when confirm button is clicked', async () => {
    const { observable } = service.open(TestModalComponent, {
      footer: {
        primaryButton: { label: 'Confirmar', icon: { type: 'check' } },
      },
    });
    fixture.detectChanges();
    if (observable) {
      const action = firstValueFrom(observable);
      await userEvent.click(screen.getByTestId('ion-button-Confirmar'));

      await expect(action).resolves.toMatchObject({ action: 'onConfirm' });
    }
  });

  it('should close modal', async () => {
    service.open(TestModalComponent);
    fixture.detectChanges();
    expect(screen.getByTestId('ion-modal')).toBeVisible();
    service.close();
    fixture.detectChanges();
    expect(screen.queryByTestId('ion-modal')).toBeNull();
  });

  it('should close modal with a given id', async () => {
    const { id } = service.open(TestModalComponent);
    fixture.detectChanges();
    expect(screen.getByTestId('ion-modal')).toBeVisible();
    service.closeById(id);
    fixture.detectChanges();
    expect(screen.queryByTestId('ion-modal')).toBeNull();
  });

  it('should close all modals', async () => {
    service.open(TestModalComponent);
    service.open(TestModalComponent);
    fixture.detectChanges();
    expect(screen.getAllByTestId('ion-modal').length).toBe(2);
    service.closeAll();
    fixture.detectChanges();
    expect(screen.queryByTestId('ion-modal')).toBeNull();
  });

  it('should update modal configuration', () => {
    service.open(TestModalComponent);
    fixture.detectChanges();
    service.update({ title: 'Updated' });
    fixture.detectChanges();
    expect(screen.getByRole('heading', { name: /updated/i })).toBeVisible();
  });

  it('should prevent close on ESC key if preventCloseOnEscKey is true', async () => {
    service.open(TestModalComponent, { preventCloseOnEscKey: true });
    fixture.detectChanges();
    expect(screen.getByTestId('ion-modal')).toBeVisible();
    await userEvent.keyboard('{Escape}');
    fixture.detectChanges();
    expect(screen.getByTestId('ion-modal')).toBeVisible();
  });

  it('should close on ESC key if preventCloseOnEscKey is false', async () => {
    service.open(TestModalComponent, { preventCloseOnEscKey: false });
    fixture.detectChanges();
    expect(screen.getByTestId('ion-modal')).toBeVisible();
    await userEvent.keyboard('{Escape}');
    fixture.detectChanges();
    expect(screen.queryByTestId('ion-modal')).toBeNull();
  });
});

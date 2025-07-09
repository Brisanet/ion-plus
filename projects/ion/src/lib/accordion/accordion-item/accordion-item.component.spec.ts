import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { fireEvent, screen } from '@testing-library/angular';
import { IonAccordionItemComponent } from './accordion-item.component';

@Component({
  standalone: true,
  imports: [CommonModule, IonAccordionItemComponent],
  template: ` <ion-accordion-item [templateHeader]="customHeader" [data]="data">
      <p data-testid="ion-accordion-item__main-paragraph">Context Main</p>
    </ion-accordion-item>
    <ng-template #customHeader> {{ data.name }}</ng-template>`,
})
class AccordionItemTestComponent {
  data = { name: 'Accordion header' };
}

describe('IonAccordionItem', () => {
  let accordionTestComponent!: AccordionItemTestComponent;
  let fixture!: ComponentFixture<AccordionItemTestComponent>;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [AccordionItemTestComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AccordionItemTestComponent);
    accordionTestComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(async () => {
    fixture.destroy();
  });

  it('should render ion-accordion-item', async () => {
    expect(screen.getByTestId('ion-accordion-item')).toBeTruthy();
  });

  it('should render the header with the name Brisanet', async () => {
    const accordionHeader = 'Brisanet';
    accordionTestComponent.data.name = accordionHeader;
    fixture.detectChanges();
    expect(screen.getByTestId('ion-accordion-item__header')).toHaveTextContent(
      accordionHeader
    );
  });

  it('should render main when clicking on header', async () => {
    const header = screen.getByTestId('ion-accordion-item__header');
    fireEvent.click(header);
    fixture.detectChanges();
    expect(screen.getByTestId('ion-accordion-item__main')).toBeTruthy();
    expect(
      screen.getByTestId('ion-accordion-item__main-paragraph')
    ).toHaveTextContent('Context Main');
  });

  it('should not render main when clicking on header twice', async () => {
    const header = screen.getByTestId('ion-accordion-item__header');
    fireEvent.click(header);
    fireEvent.click(header);
    fixture.detectChanges();
    expect(screen.queryByTestId('ion-accordion-item__main')).not.toBeTruthy();
  });
});

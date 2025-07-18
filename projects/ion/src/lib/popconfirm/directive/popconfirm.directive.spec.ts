import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  DebugElement,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { fireEvent, screen, within } from '@testing-library/angular';
import { IonButtonComponent } from '../../button';
import { IonPopConfirmComponent } from '../component/popconfirm.component';
import {
  IonPopConfirmDirective,
  PopOffset,
  PopPosition,
} from './popconfirm.directive';

const textButton = 'Teste';
const tableTextButton = 'Teste na table';
const confirmText = 'Confirmar';
const elementPosition: PopPosition = {
  top: 10,
  left: 500,
  width: 24,
};

const documentWidth = 1024;

const openToRightOffset: PopOffset = {
  top: 10,
  left: 488,
  width: 210,
  screenOffset: 524,
};

const openToLeftOffset: PopOffset = {
  top: 10,
  left: 438,
  width: 210,
  screenOffset: 96,
};

const openToUpOffset: PopOffset = {
  top: 1800,
  left: 438,
  width: 210,
  screenOffset: 96,
};

@Component({
  standalone: true,
  imports: [IonPopConfirmComponent, IonPopConfirmDirective],
  template: `
    @if (buttonVisibility) {
      <button
        ionPopConfirm
        ionPopConfirmTitle="Você tem certeza?"
        ionPopConfirmDesc="Teste"
        (ionOnConfirm)="confirm()"
        class="get-test"
        style="margin-top: 50px;">
        ${textButton}
      </button>
    }
  `,
})
class ContainerRefTestComponent {
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;
  buttonVisibility = true;
}

@Component({
  standalone: true,
  imports: [IonPopConfirmComponent, IonButtonComponent, IonPopConfirmDirective],
  template: `
    <ion-button
      ionPopConfirm
      ionPopConfirmTitle="teste demais"
      type="ghost"
      size="sm"
      [disabled]="true" />
  `,
})
class ButtonTestDisabledComponent {
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  public disabled = true;
}

@Component({
  standalone: true,
  imports: [IonPopConfirmComponent, IonButtonComponent, IonPopConfirmDirective],
  template: `
    <ion-button
      ionPopConfirm
      ionPopConfirmTitle="teste demais"
      type="ghost"
      size="sm"
      [loading]="loading" />
  `,
})
class ButtonTestLoadingComponent {
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  public loading = true;
}

@Component({
  standalone: true,
  imports: [IonPopConfirmComponent, IonPopConfirmDirective],
  template: `
    <table style="width: 100%;">
      <tr>
        <th>Código</th>
        <th>Nome</th>
        <th>Ações</th>
      </tr>
      <tr>
        <td>1</td>
        <td>Meteora</td>
        <td>
          <button
            ionPopConfirm
            ionPopConfirmTitle="Você tem certeza?"
            ionConfirmText="Sim"
            ionCancelText="Não"
            (ionOnConfirm)="confirm()"
            class="get-test"
            style="margin-top: 50px;">
            ${tableTextButton}
          </button>
        </td>
      </tr>
    </table>
  `,
})
class TableTestComponent {
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;
}

describe('Directive: Popconfirm', () => {
  let fixture: ComponentFixture<ContainerRefTestComponent>;
  let directive: IonPopConfirmDirective;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      providers: [IonPopConfirmDirective, ViewContainerRef],
      imports: [ContainerRefTestComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).createComponent(ContainerRefTestComponent);

    fixture.detectChanges();
    directive = fixture.debugElement.injector.get(IonPopConfirmDirective);
  });

  afterEach(() => {
    directive.closePopConfirm();
  });

  it('should create element with the directive', () => {
    directive.open();
    expect(screen.getByText(textButton)).toHaveAttribute('ionpopconfirm', '');
  });

  it('should open the popconfirm when clicked', () => {
    directive.open();
    const button = screen.getByText(textButton);
    fireEvent.click(button);

    const buttonConfirm = screen.getByTestId('pop-confirm-btn');
    expect(buttonConfirm).toBeInTheDocument();
  });

  it('should close pop when click in cancel', () => {
    jest.spyOn(directive, 'closePopConfirm');

    directive.open();
    fireEvent.click(screen.getByTestId('pop-cancel-btn'));

    expect(directive.closePopConfirm).toHaveBeenCalled();
  });

  it('should close pop when click in confirm', () => {
    jest.spyOn(directive, 'closePopConfirm');

    directive.open();
    fireEvent.click(screen.getByTestId('pop-confirm-btn'));

    expect(directive.closePopConfirm).toHaveBeenCalled();
  });

  it('should close pop when the button element is removed from the view', () => {
    jest.spyOn(directive, 'closePopConfirm');

    directive.open();
    fixture.componentInstance.buttonVisibility = false;

    expect(directive.closePopConfirm).toHaveBeenCalled();
  });

  it('should click in confirm button', () => {
    directive.open();
    fireEvent.click(
      within(screen.getByTestId('pop-confirm-btn')).getByRole('button')
    );
    expect(screen.queryByTestId('pop-confirm-btn')).not.toBeInTheDocument();
  });

  it('should not open new popconfirm when be opened', () => {
    directive.open();
    directive.open();
    expect(screen.queryAllByTestId('pop-confirm-btn')).toHaveLength(1);
  });
});

describe('Popconfirm host tests', () => {
  let fixture: ComponentFixture<ContainerRefTestComponent>;
  let directive: IonPopConfirmDirective;
  let input: DebugElement;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      providers: [IonPopConfirmDirective, ViewContainerRef],
      imports: [ContainerRefTestComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).createComponent(ContainerRefTestComponent);

    fixture.detectChanges();
    directive = fixture.debugElement.injector.get(IonPopConfirmDirective);
    input = fixture.debugElement.query(By.directive(IonPopConfirmDirective));
  });

  afterEach(() => {
    directive.closePopConfirm();
  });

  it('should click in host element and dispatch event', () => {
    fixture.detectChanges();
    const event = new Event('click');
    input.triggerEventHandler('click', event);

    expect(screen.getByText(confirmText)).toBeInTheDocument();
  });
});

describe('Popconfirm disabled host component', () => {
  let fixtureDisabledBtn: ComponentFixture<ButtonTestDisabledComponent>;
  let directive: IonPopConfirmDirective;
  let input: DebugElement;

  beforeEach(() => {
    fixtureDisabledBtn = TestBed.configureTestingModule({
      providers: [IonPopConfirmDirective, ViewContainerRef],
      imports: [ButtonTestDisabledComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).createComponent(ButtonTestDisabledComponent);

    fixtureDisabledBtn.detectChanges();
    directive = fixtureDisabledBtn.debugElement.injector.get(
      IonPopConfirmDirective
    );
    input = fixtureDisabledBtn.debugElement.query(
      By.directive(IonPopConfirmDirective)
    );
  });

  afterEach(() => {
    directive.closePopConfirm();
  });

  it('should not open popconfirm when the button is disabled', () => {
    setTimeout(() => {
      fixtureDisabledBtn.detectChanges();
      const event = new Event('click');
      input.triggerEventHandler('click', event);

      expect(event).not.toBeCalled();
      expect(screen.queryAllByText(confirmText)).toHaveLength(0);
    });
  });

  it('should return false if child element is disabled', () => {
    const element = document.createElement('ion-button');
    element
      .appendChild(document.createElement('button'))
      .setAttribute('disabled', '');
    const isEnable = directive.elementsAreEnabled(element);
    expect(isEnable).toBe(false);
  });

  it('should return false if element is disabled', () => {
    const element = document.createElement('ion-button');
    element.setAttribute('disabled', '');
    const isEnable = directive.elementsAreEnabled(element);
    expect(isEnable).toBe(false);
  });
});

describe('Popconfirm loading host component', () => {
  let fixtureLoadingBtn: ComponentFixture<ButtonTestLoadingComponent>;
  let directive: IonPopConfirmDirective;
  let input: DebugElement;

  beforeEach(() => {
    fixtureLoadingBtn = TestBed.configureTestingModule({
      providers: [IonPopConfirmDirective, ViewContainerRef],
      imports: [ButtonTestLoadingComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).createComponent(ButtonTestLoadingComponent);

    fixtureLoadingBtn.detectChanges();
    directive = fixtureLoadingBtn.debugElement.injector.get(
      IonPopConfirmDirective
    );
    input = fixtureLoadingBtn.debugElement.query(
      By.directive(IonPopConfirmDirective)
    );
  });

  afterEach(() => {
    directive.closePopConfirm();
  });

  it('should not open popconfirm when the button is loading', () => {
    setTimeout(() => {
      fixtureLoadingBtn.detectChanges();
      const event = new Event('click');
      input.triggerEventHandler('click', event);

      expect(event).not.toBeCalled();
      expect(screen.queryAllByText(confirmText)).toHaveLength(0);
    });
  });
});

describe('Popconfirm position when it opens', () => {
  let fixtureTable: ComponentFixture<TableTestComponent>;
  let directive: IonPopConfirmDirective;

  beforeEach(() => {
    fixtureTable = TestBed.configureTestingModule({
      providers: [IonPopConfirmDirective, ViewContainerRef],
      imports: [TableTestComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).createComponent(TableTestComponent);

    fixtureTable.detectChanges();
    directive = fixtureTable.debugElement.injector.get(IonPopConfirmDirective);

    fireEvent.click(screen.getByText(tableTextButton));
    directive.open();
  });

  afterEach(() => {
    directive.closePopConfirm();
  });

  it('should set the correct position', () => {
    const popconfirmElement = screen.getAllByTestId('sup-container')[0];
    const position: PopOffset = directive.setPosition(
      popconfirmElement,
      documentWidth,
      elementPosition
    );
    expect(position.left).toBe(openToRightOffset.left);
  });

  it('should open to the right side', () => {
    jest.spyOn(window, 'requestAnimationFrame');
    const popconfirmElement = document.querySelector(
      '.sup-container'
    ) as HTMLElement;
    directive.setStyle(popconfirmElement, openToRightOffset);
    expect(popconfirmElement.classList).toContain('sup-container');
  });

  it('should open to the left side', async () => {
    jest.spyOn(window, 'requestAnimationFrame');
    const popconfirmElement = document.querySelector(
      '.sup-container'
    ) as HTMLElement;
    directive.setStyle(popconfirmElement, openToLeftOffset);
    expect(popconfirmElement.classList).toContain('sup-container-right');
  });

  it('should set the correct position when is bottom', () => {
    const popconfirmElement = screen.getAllByTestId('sup-container')[0];
    const position: PopOffset = directive.setPosition(
      popconfirmElement,
      documentWidth,
      openToUpOffset
    );

    directive.setStyle(popconfirmElement, openToUpOffset);
    expect(popconfirmElement.classList).toContain('sup-container-bottom');
    expect(position.top).toBe(openToUpOffset.top);
  });

  it('should set position when there is a animation frame', () => {
    const spyAnimationFrame = jest.spyOn(window, 'requestAnimationFrame');
    const spyQuerySelector = jest.spyOn(document, 'querySelector');
    spyAnimationFrame.mock.calls[0][0](0);

    expect(spyAnimationFrame).toHaveBeenCalled();
    expect(spyQuerySelector).toHaveBeenCalledWith('.sup-container');
  });
});

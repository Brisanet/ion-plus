import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { IonIconComponent } from '../../../ion/src/public-api';
import { IonSelectComponent } from '../../../ion/src/lib/select';
import { IonButtonComponent } from '../../../ion/src/lib/button'; // Importar o botão
import { IonDropdownDirective } from '../../../ion/src/lib/directives/dropdown/dropdown.directive'; // Importar a diretiva

// Definindo a interface localmente
interface DropdownOption {
  value: string;
  key: string;
  label: string;
  selected?: boolean;
  disabled?: boolean;
  hovered?: boolean;
}

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    IonIconComponent,
    IonSelectComponent,
    IonButtonComponent, // Importar o componente de botão
    IonDropdownDirective, // Importar a diretiva
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ion-test';

  // Lista de opções para o dropdown
  dropdownOptions: DropdownOption[] = [
    {
      value: '1',
      key: '1',
      label: 'Opção 1',
      selected: false,
    },
    {
      value: '2',
      key: '2',
      label: 'Opção 2',
      selected: false,
    },
    {
      value: '3',
      key: '3',
      label: 'Opção 3',
      selected: false,
    },
  ];

  // Configuração do dropdown
  dropdownConfig = {
    multiple: true,
    required: false,
    shouldRender: true,
    closeOnScroll: false,
  };

  // Método para capturar as mudanças
  onDropdownChange(options: DropdownOption[]): void {
    console.log(
      'Opções selecionadas:',
      options.filter(opt => opt.selected)
    );
  }
}

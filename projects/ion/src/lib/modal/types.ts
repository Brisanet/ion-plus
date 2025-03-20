import { IonAlertProps } from '../alert';
import { IonButtonProps } from '../button';
import { SafeAny } from '../utils/safe-any';

export type Action = 'onHeaderAction' | 'onConfirm' | 'onClose';

export interface ModalResponse {
  action: Action;
  instance?: Record<string, unknown>;
}

export interface DialogConfiguration {
  showOverlay?: boolean;
  disableClose?: boolean;
}

export interface ModalConfiguration {
  title?: string;
  width?: number;
  preventCloseOnEscKey?: boolean;
  params?: SafeAny;
  hideCloseButton?: boolean;
  headerButton?: Pick<IonButtonProps, 'label' | 'icon'> & {
    hidden?: () => boolean;
    disabled?: () => boolean;
  };
  alert?: Pick<IonAlertProps, 'type' | 'message' | 'description'>;
  preventCloseOnConfirm?: boolean;
  customClass?: string;
  footer?: {
    hide?: boolean;
    showDivider?: boolean;
    primaryButton?: Partial<
      Pick<IonButtonProps, 'label' | 'icon' | 'disabled' | 'loading'>
    >;
    secondaryButton?: Partial<Pick<IonButtonProps, 'label' | 'icon'>>;
  };
}

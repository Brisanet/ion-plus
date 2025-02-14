export type StatusType =
  | 'success'
  | 'info'
  | 'warning'
  | 'negative'
  | 'neutral';

export enum statusColor {
  success = '#2d9f70',
  info = '#0bb2cb',
  warning = '#f9a915',
  negative = '#d6293a',
  neutral = '#8d93a5',
}

export enum statusIcon {
  success = 'check-solid',
  info = 'info-solid',
  warning = 'exclamation-solid',
  negative = 'close-solid',
  neutral = 'info',
}

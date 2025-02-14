import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Renderer2,
  computed,
  effect,
  input,
  viewChild,
} from '@angular/core';
import { iconsPaths } from './svgs/icons';
import { ContainerStyle, IonIconProps } from './types';

const DEFAULT_STYLE = {
  color: 'transparent',
  size: 'unset',
};

@Component({
  selector: 'ion-icon',
  imports: [CommonModule],
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonIconComponent {
  type = input.required<IonIconProps['type']>();
  size = input<IonIconProps['size']>(24);
  color = input<IonIconProps['color']>('#282b33');
  highlight = input<IonIconProps['highlight']>('none');

  svgElement = viewChild<ElementRef>('svgElement');

  outerContainerStyle = computed<ContainerStyle>(() => {
    if (!this.isHex()) {
      return DEFAULT_STYLE;
    }

    const stylesControl = {
      double: {
        color: `${this.color()}1A`,
        size: `${this.size() * this.getCircleProportion().outsideCircle}px`,
      },
      simple: {
        color: `${this.color()}1A`,
        size: `${this.size() * 2}px`,
      },
      none: DEFAULT_STYLE,
    };

    return {
      color: stylesControl[this.highlight()].color,
      size: stylesControl[this.highlight()].size,
    };
  });

  innerContainerStyle = computed<ContainerStyle>(() => {
    if (!this.isHex()) {
      return DEFAULT_STYLE;
    }

    const stylesControl = {
      double: {
        color: `${this.color()}40`,
        size: `${this.size() * this.getCircleProportion().innerCircle}px`,
      },
      simple: DEFAULT_STYLE,
      none: DEFAULT_STYLE,
    };

    return {
      color: stylesControl[this.highlight()].color,
      size: stylesControl[this.highlight()].size,
    };
  });

  constructor(private renderer: Renderer2) {
    effect(() => {
      if (iconsPaths[this.type()]) {
        const paths = iconsPaths[this.type()].split('/>');
        const resultPaths = paths
          .map((path, index) => {
            return path.includes('path')
              ? `${path} id="ion-icon-path-${this.type}-${index}" />`
              : '';
          })
          .join('');

        this.renderer.setProperty(
          this.svgElement()?.nativeElement,
          'innerHTML',
          resultPaths
        );
      }
    });
  }

  private isHex = computed(() => {
    const regex = /^#?([0-9A-Fa-f]{6})$/;
    return !!this.color() && regex.test(this.color()!);
  });

  private getCircleProportion = computed(() => {
    const mdIcon = 24;
    const proportions = {
      largeIcon: {
        inner: 1.5,
        outer: 2.25,
      },
      smallIcon: {
        inner: 1.75,
        outer: 2.5,
      },
    };

    const iconSize =
      this.size() && this.size() >= mdIcon ? 'largeIcon' : 'smallIcon';

    return {
      innerCircle: proportions[iconSize].inner,
      outsideCircle: proportions[iconSize].outer,
    };
  });
}

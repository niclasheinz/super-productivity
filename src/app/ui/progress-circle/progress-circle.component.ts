import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  effect,
  Renderer2,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'progress-circle',
  templateUrl: './progress-circle.component.html',
  styleUrls: ['./progress-circle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressCircleComponent {
  private readonly _renderer = inject(Renderer2);

  progress = input<number>();

  readonly progressCircle = viewChild<ElementRef>('progressCircle');

  constructor() {
    effect(() => {
      const progressCircle = this.progressCircle();
      if (progressCircle) {
        let progress = this.progress() || 0;
        if (progress > 100) {
          progress = 100;
        }

        this._renderer.setStyle(
          progressCircle.nativeElement,
          'stroke-dasharray',
          `${progress} ,100`,
        );
      }
    });
  }
}

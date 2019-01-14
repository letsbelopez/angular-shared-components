import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Inject
} from '@angular/core';
import { TooltipContainerDirective } from '../../directives/tooltip/tooltipContainer.directive';

@Component({
  selector: 'dlo-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {
  top: string;
  left: string;
  position: string;
  @ViewChild(TooltipContainerDirective, { read: ElementRef })
  private tooltipContainer;

  constructor(@Inject('tooltipConfig') private config) {
    this.position = this.config.position;
  }

  ngOnInit() {
    const {
      top,
      height: hostHeight,
      width: hostWidth,
      left
    } = this.config.host.getBoundingClientRect();

    const {
      height: tooltipHeight,
      width: toolTipWidth
    } = this.tooltipContainer.nativeElement.getBoundingClientRect();

    if (this.position === 'top') {
      // adding 8px for the tooltip arrow
      this.top = `${top - (tooltipHeight + 8)}px`;
    }
    if (this.position === 'bottom') {
      // adding 8px for the tooltip arrow
      this.top = `${top + (hostHeight + 8)}px`;
    }
    // handle X position for top and bottom
    // center the tooltip relative to the host
    if (this.position === 'top' || this.position === 'bottom') {
      this.left = `${left - (toolTipWidth / 2 - hostWidth / 2)}px`;
    }
    if (this.position === 'left') {
      this.left = `${left - toolTipWidth}px`;
      this.top = `${top - (tooltipHeight / 2 - hostHeight / 2)}px`;
    }
    if (this.position === 'right') {
      this.left = `${left + hostWidth}px`;
      this.top = `${top - (tooltipHeight / 2 - hostHeight / 2)}px`;
    }
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipDirective } from './directives/tooltip/tooltip.directive';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { TooltipContainerDirective } from './directives/tooltip/tooltipContainer.directive';

@NgModule({
  declarations: [TooltipDirective, TooltipComponent, TooltipContainerDirective],
  imports: [
    CommonModule
  ],
  exports: [TooltipDirective, TooltipComponent, TooltipContainerDirective],
  entryComponents: [TooltipComponent]
})
export class SharedModule { }

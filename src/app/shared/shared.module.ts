import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipDirective } from './directives/tooltip/tooltip.directive';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { TooltipContainerDirective } from './directives/tooltip/tooltipContainer.directive';
import { ToggleButtonComponent } from './components/toggleButton/toggleButton.component';

@NgModule({
  declarations: [TooltipDirective, TooltipComponent, TooltipContainerDirective, ToggleButtonComponent],
  imports: [
    CommonModule
  ],
  exports: [TooltipDirective, TooltipComponent, TooltipContainerDirective, ToggleButtonComponent],
  entryComponents: [TooltipComponent]
})
export class SharedModule { }

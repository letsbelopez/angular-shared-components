import { Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'dlo-toggle-button',
  templateUrl: './toggleButton.component.html',
  styleUrls: ['./toggleButton.component.scss']
})
export class ToggleButtonComponent {
  checked: EventEmitter<boolean>;

  onChange(input) {
    this.checked.emit(input.checked);
  }
}

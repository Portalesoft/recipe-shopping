// This is just an example of a dynamic component, as part of the course
// It's not supposed to be the ideal way to display errors to the user!

import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
   selector: 'app-alert',
   templateUrl: './alert.component.html',
   styleUrls: ['./alert.component.css']
})
export class AlertComponent {

    @Input() message: string;
    @Output() closeAlert = new EventEmitter<void>();

    onCloseAlert() {
        this.closeAlert.emit();
    }

}

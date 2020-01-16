import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})

export class DropdownDirective {

    @HostBinding('class.show') show = false;

    @HostListener('click') toggleShow() {
        this.show = !this.show;
    }

}

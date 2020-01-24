import { trigger, animate, transition, style, query } from '@angular/animations';

export const fadeElementsAnimation = trigger('fadeElementsAnimation', [
    transition('* => *', [
        query(':enter',
            [
                style({ opacity: 0 })
            ],
            { optional: true }
        ),
        query(':leave',
            [
                style({ opacity: 1 }),
                animate('0.15s', style({ opacity: 0 }))
            ],
            { optional: true }
        ),
        query(':enter',
            [
                style({ opacity: 0 }),
                animate('0.15s', style({ opacity: 1 }))
            ],
            { optional: true }
        )
    ])
]);
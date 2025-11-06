import { Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-footer',
    template: `<div class="layout-footer">
        CuraSystem by
        <a href="https://github.com/Sammadar" target="_blank" rel="noopener noreferrer" class="text-primary font-bold hover:underline">Sammadar</a>
    </div>`
})
export class AppFooter {}

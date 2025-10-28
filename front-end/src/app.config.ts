import { provideHttpClient, withFetch } from '@angular/common/http';
import { LOCALE_ID, ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import Aura from '@primeuix/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { appRoutes } from './app.routes';
import localePt from '@angular/common/locales/pt'
import { registerLocaleData } from '@angular/common';

registerLocaleData(localePt);

export const appConfig: ApplicationConfig = {
    providers: [
        { provide: LOCALE_ID, useValue: 'pt-BR' },
        provideRouter(appRoutes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withEnabledBlockingInitialNavigation()),
        provideHttpClient(withFetch()),
        provideAnimationsAsync(),
        providePrimeNG({ theme: { preset: Aura, options: { darkModeSelector: '.app-dark' } } })
    ]
};

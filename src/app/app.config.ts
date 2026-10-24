import { ApplicationConfig } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  // scrollPositionRestoration: every page opens at the top (back/forward restores position)
  providers: [provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }))]
};

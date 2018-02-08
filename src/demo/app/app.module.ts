import '../styles/headings.css';
import '../styles/styles.scss';

import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule, MatDialogModule, MatListModule, MatRadioModule, MatSidenavModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules, RouterModule } from '@angular/router';
import {
  CachingInterceptor,
  HttpCache,
  LocalHttpCache,
  LocalOngoingHttpCache,
  OnGoingHttpCache,
} from '@helgoland/caching/src/caching';
import { ApiInterface, CoreModule, GetDataApiInterface, Settings, SettingsService } from '@helgoland/core';
import { D3Module } from '@helgoland/d3';
import { HelgolandDatasetlistModule } from '@helgoland/depiction/datasetlist/src';
import { FavoriteModule } from '@helgoland/favorite/src/module';
import { FlotModule } from '@helgoland/flot/src/flot';
import { GeoSearch, NominatimGeoSearchService } from '@helgoland/map';
import { MapControlModule } from '@helgoland/map/control';
import { MapSelectorModule } from '@helgoland/map/selector';
import { MapViewModule } from '@helgoland/map/view';
import { ModificationModule } from '@helgoland/modification/src/module';
import { PermalinkModule } from '@helgoland/permalink/src/module';
import { SelectorModule } from '@helgoland/selector';
import { TimeModule } from '@helgoland/time/src/module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { GraphLegendComponent } from 'demo/app/pages/graph-legend/graph-legend.component';
import { MapSelectorComponent } from 'demo/app/pages/map-selector/map-selector.component';
import { ProfileEntryComponent } from 'demo/app/pages/profile-entry/profile-entry.component';
import { TrajectoryComponent } from 'demo/app/pages/trajectory/trajectory.component';
import { settingsPromise } from 'demo/main.browser';
import { environment } from 'environments/environment';

import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { ROUTES } from './app.routes';
import { AppState } from './app.service';
import { LocalSelectorImplComponent } from './components/local-selector/local-selector.component';
import { StyleModificationComponent } from './components/style-modification/style-modification.component';
import { FavoriteComponent } from './pages/favorite/favorite.component';
import { FlotGraphComponent } from './pages/flot-graph/flot-graph.component';
import { ListSelectionComponent } from './pages/list-selection/list-selection.component';
import { PermalinkComponent } from './pages/permalink/permalink.component';
import { ProviderSelectorComponent } from './pages/provider-selector/provider-selector.component';
import { ServiceFilterSelectorDemoPageComponent } from './pages/service-filter-selector/service-filter-selector.component';
import { TimeComponent } from './pages/time/time.component';

@Injectable()
export class ExtendedSettingsService extends SettingsService<Settings> {
  constructor() {
    super();
    settingsPromise.then((result) => {
      this.setSettings(result);
    });
  }
}

const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState,
  {
    provide: HttpCache,
    useClass: LocalHttpCache
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: CachingInterceptor,
    multi: true
  },
  {
    provide: OnGoingHttpCache,
    useClass: LocalOngoingHttpCache
  },
  {
    provide: ApiInterface,
    useClass: GetDataApiInterface
  },
  {
    provide: SettingsService,
    useClass: ExtendedSettingsService
  },
  {
    provide: GeoSearch,
    useClass: NominatimGeoSearchService
  }
];

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent,
    LocalSelectorImplComponent,
    StyleModificationComponent,
    ProviderSelectorComponent,
    ListSelectionComponent,
    FlotGraphComponent,
    // PlotlyGraphComponent,
    TimeComponent,
    FavoriteComponent,
    PermalinkComponent,
    ServiceFilterSelectorDemoPageComponent,
    MapSelectorComponent,
    ProfileEntryComponent,
    GraphLegendComponent,
    TrajectoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules }),
    MatSidenavModule,
    MatListModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDialogModule,
    BrowserAnimationsModule,
    SelectorModule,
    FlotModule,
    CoreModule,
    TimeModule,
    FavoriteModule,
    PermalinkModule,
    MapSelectorModule,
    MapControlModule,
    MapViewModule,
    ModificationModule,
    HelgolandDatasetlistModule,
    D3Module
    // PlotlyModule
  ],
  entryComponents: [
    StyleModificationComponent
  ],
  providers: [
    environment.ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule { }

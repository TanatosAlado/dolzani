import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import localeArEG from '@angular/common/locales/ar-EG';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth/auth.module';
import { ShopModule } from './modules/shop/shop.module';
import { SharedModule } from './shared/shared.module';
import { environment } from 'src/environment/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app'; // API modular
import { provideAuth, getAuth } from '@angular/fire/auth'; // Para Auth (si lo usas)
import { provideFirestore, getFirestore } from '@angular/fire/firestore'; // Para Firestore (si lo usas)
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminModule } from './modules/admin/admin.module';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { SocialesModule } from './modules/sociales/sociales.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { registerLocaleData } from '@angular/common';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
registerLocaleData(localeArEG);


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ShopModule,
    AuthModule,
    // Inicialización modular de Firebase
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()), // Solo si usas Firestore
    BrowserAnimationsModule,
    AdminModule,
    SocialesModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [HttpClientModule ]
})
export class AppModule { }
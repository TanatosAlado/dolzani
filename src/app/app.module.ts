import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
    AdminModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
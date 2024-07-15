import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { PasswordRecoveryComponent } from './components/password-recovery/password-recovery.component';
import { ProfileModificationComponent } from './components/profile-modification/profile-modification.component';
import { AdminSectionComponent } from './components/admin-section/admin-section.component';
import { PrivateSectionComponent } from './components/private-section/private-section.component';
import { PdfViewerComponent } from './components/pdf-viewer/pdf-viewer.component';
import { SafePipe } from './pipes/safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    PasswordRecoveryComponent,
    ProfileModificationComponent,
    AdminSectionComponent,
    PrivateSectionComponent,
    PdfViewerComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

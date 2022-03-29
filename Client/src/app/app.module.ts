import { NgModule } from '@angular/core';

// MODULES
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// MATERIAL
import { MaterialModule } from './material.module';

// PLUGINS
import { QuillModule } from 'ngx-quill';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// INTERCEPTOR
import { TokenInterceptor } from './interceptor/auth.interceptor';

// ENVIRONMENT
import { environment } from '../environments/environment';

// COMPONENTS
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { ExampleComponent } from './main/example/example.component';
import { ExampleEditorComponent } from './main/example/example-editor/example-editor.component';
import { UsersComponent } from './main/users/users.component';
import { UsersEditorComponent } from './main/users/users-editor/users-editor.component';
import { LoginComponent } from './login/login.component';
import { DeleteDialogComponent } from './_dialogs/delete-dialog/delete-dialog.component';
import { ProfileDialogComponent } from './_dialogs/profile-dialog/profile-dialog.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DashboardComponent,
    ExampleComponent,
    ExampleEditorComponent,
    UsersComponent,
    UsersEditorComponent,
    LoginComponent,
    DeleteDialogComponent,
    ProfileDialogComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    QuillModule.forRoot(),
    TranslateModule.forRoot({
      defaultLanguage: environment.defaultLang,
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

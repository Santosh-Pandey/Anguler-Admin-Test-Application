import { DatatableComponent } from './datatable/datatable.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { CreateComponent } from './create/create.component';
import { HttpClientModule } from '@angular/common/http';
import { DisplayComponent } from './display/display.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { SessionService } from './session.service';
import { LogoutComponent } from './logout/logout.component';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { BnNgIdleService } from 'bn-ng-idle'; // import bn-ng-idle service for session
import { RecaptchaModule } from 'ng-recaptcha';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { SendemailComponent } from './sendemail/sendemail.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { DynamicformComponent } from './dynamicform/dynamicform.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BootstrapmodelComponent } from './bootstrapmodel/bootstrapmodel.component';
import {DataTablesModule} from 'angular-datatables';
import { ReadcsvComponent } from './readcsv/readcsv.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    FooterComponent,
    CreateComponent,
    DisplayComponent,
    EditComponent,
    DeleteComponent,
    LoginComponent,
    PagenotfoundComponent,
    LogoutComponent,
    FileuploadComponent,
    SendemailComponent,
    DynamicformComponent,
    BootstrapmodelComponent,
    DatatableComponent,
    ReadcsvComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RecaptchaModule,
    FlashMessagesModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot(),
    NgbModule,
    DataTablesModule
  ],
  providers: [SessionService, BnNgIdleService],
  bootstrap: [AppComponent]
})
export class AppModule { }

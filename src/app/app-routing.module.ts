import { ExporttocsvComponent } from './exporttocsv/exporttocsv.component';
import { ReadcsvComponent } from './readcsv/readcsv.component';
import { DatatableComponent } from './datatable/datatable.component';
import { SendemailComponent } from './sendemail/sendemail.component';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { LogoutComponent } from './logout/logout.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { LoginComponent } from './login/login.component';
import { DeleteComponent } from './delete/delete.component';
import { EditComponent } from './edit/edit.component';
import { DisplayComponent } from './display/display.component';
import { CreateComponent } from './create/create.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DynamicformComponent } from './dynamicform/dynamicform.component';
import { BootstrapmodelComponent } from './bootstrapmodel/bootstrapmodel.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'create', component: CreateComponent},
  {path: 'display', component: DisplayComponent},
  {path: 'edit/:id', component: EditComponent},
  {path: 'delete/:id', component: DeleteComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'upload', component: FileuploadComponent},
  {path: 'sendemail', component: SendemailComponent},
  {path: 'dynamicform', component: DynamicformComponent},
  {path: 'openmodel', component: BootstrapmodelComponent},
  {path: 'datatable', component: DatatableComponent},
  {path: 'readcsv', component: ReadcsvComponent},
  {path: 'exportdata', component: ExporttocsvComponent},
  {path: '**', component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';


import { AppRegistrationComponent } from './pages/app-registration/app-registration.component';
import { ApiRegistrationComponent } from './pages/api-registration/api-registration.component';
import { UserRegistrationComponent } from './pages/user-registration/user-registration.component';
import { InfoBarComponent } from './components/info-bar/info-bar.component';
import { TableComponent } from './components/table/table.component';


import { ObjectToArrayPipe } from './pipes/objectToArray/object-to-array.pipe';

import { ToastrModule } from 'ngx-toastr';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { UiSwitchModule } from 'ngx-toggle-switch';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    
    HeaderComponent,
    SidebarComponent,
    PageHeaderComponent,
    TableComponent,


    AppRegistrationComponent,
    ApiRegistrationComponent,
    UserRegistrationComponent,

    ObjectToArrayPipe,

    InfoBarComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added

    NgMultiSelectDropDownModule.forRoot(),

    UiSwitchModule,

    NgbModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent }  from './app.component';
import { DistrictComponent }  from './district/district.component';
import { districtService } from './district/district.service';
import { SchoolComponent } from './school/school.component';
import { schoolService } from './school/school-svc.service';

import { AppRoutingModule } from './app-routing.module';
import { DisteditaddComponent } from './disteditadd/disteditadd.component';
import { DistselComponent } from './distsel/distsel.component';
import { Select2Module } from 'ng2-select2';
@NgModule({
  imports: [     
        BrowserModule,
		HttpModule,
    ReactiveFormsModule, 
    AppRoutingModule,
    Select2Module,
    FormsModule, 
    ReactiveFormsModule
  ],
  declarations: [
        AppComponent,
		DistrictComponent,
		SchoolComponent,
		DisteditaddComponent,
    DistselComponent
  ],
  providers: [
        districtService,
        schoolService,
        AppRoutingModule
  ],
  bootstrap: [
        AppComponent
  ]
})
export class AppModule { }






/*


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DistrictComponent } from './district/district.component';

@NgModule({
  declarations: [
    AppComponent,
    DistrictComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } 

**/

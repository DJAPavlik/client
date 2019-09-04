import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchoolComponent } from './school/school.component';
import { DistrictComponent } from './district/district.component';
import { DisteditaddComponent } from './disteditadd/disteditadd.component'
import { DistselComponent } from './distsel/distsel.component'
const appRoutes: Routes = [
  { path: '', component: DistrictComponent },
  { path: 'xxx/:distNum', component: SchoolComponent },
  { path: 'distAdd' , component: DisteditaddComponent },
  { path: 'distEdit/:distNum' , component: DisteditaddComponent},
  { path: 'distFldSel' , component: DistselComponent},
];
/*
{ path: '/', component: DistrictComponent },
{ path: '', component: DistrictComponent }, */
@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
     // { enableTracing: true } // <-- debugging purposes only
    ),
    RouterModule.forChild(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

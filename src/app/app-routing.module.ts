import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRegistrationComponent } from './component/create-registration/create-registration.component';
import { RegistrationListComponent } from './component/registration-list/registration-list.component';
import { DragAndDropComponent } from './drag-and-drop/drag-and-drop.component';
import { CanvasBasicComponent } from './canvas/canvas-basic/canvas-basic.component';

const routes: Routes = [
  {path:'',redirectTo:'canvas-basic',pathMatch:'full'},
  {path:'register',component:CreateRegistrationComponent},
  {path:'list',component:RegistrationListComponent},
  {path:'drag-and-drop',component:DragAndDropComponent},
  {path:'canvas-basic',component:CanvasBasicComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

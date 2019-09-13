import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './component/table/table.component';
import { AddbookComponent } from './component/addbook/addbook.component';


const routes: Routes = [

  {path: "home", component: TableComponent},
  {path: "addbook", component: AddbookComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

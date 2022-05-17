import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TodoOverviewComponent} from "./todo-overview/todo-overview.component";
import {TodoCreateComponent} from "./todo-create/todo-create.component";
import {AppComponent} from "./app.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'my-todos', component: TodoOverviewComponent},
  {path: 'create-todo', component: TodoCreateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

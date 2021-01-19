import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuard } from '../auth/guards/role.guard';
import { CategoryTableComponent } from './category-table/category-table.component';

const routes: Routes = [
  {
    path: '',
    component: CategoryTableComponent,
    canActivate: [RoleGuard],
        data: {
            expectedRoles: 'ROLE_ADMIN'
        }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }

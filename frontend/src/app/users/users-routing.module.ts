import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from '../auth/guards/role.guard';
import { UsersReviewComponent } from './users-review/users-review.component';

const routes: Routes = [
    {
        path: '',
        component: UsersReviewComponent,
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

export class UsersRoutingModule { }

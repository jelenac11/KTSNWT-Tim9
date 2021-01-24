import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from '../auth/guards/role.guard';
import { ApproveCommentComponent } from './approve-comment/approve-comment.component';

const routes: Routes = [
    {
        path: '',
        component: ApproveCommentComponent,
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

export class CommentsRoutingModule { }

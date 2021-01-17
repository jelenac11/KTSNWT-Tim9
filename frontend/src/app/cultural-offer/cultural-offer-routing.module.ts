import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from '../auth/guards/role.guard';
import { CommentsReviewComponent } from '../comments/comments-review/comments-review.component';
import { CulturalOfferFormComponent } from './cultural-offer-form/cultural-offer-form.component';
import { CulturalOfferListComponent } from './cultural-offer-list/cultural-offer-list.component';
import { CulturalOfferReviewComponent } from './cultural-offer-review/cultural-offer-review.component';

const routes: Routes = [
    {
        path: '',
        component: CulturalOfferListComponent
    },
    {
        path: 'create',
        component: CulturalOfferFormComponent,
        canActivate: [RoleGuard],
        data: {
            expectedRoles: 'ROLE_ADMIN'
        }
    },
    {
        path: 'update/:id',
        component: CulturalOfferFormComponent,
        canActivate: [RoleGuard],
        data: {
            expectedRoles: 'ROLE_ADMIN'
        }
    },
    {
        path: ':id',
        component: CulturalOfferReviewComponent,
        children: [
            {
                path: 'comments',
                component: CommentsReviewComponent
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

export class CulturalOfferRoutingModule { }

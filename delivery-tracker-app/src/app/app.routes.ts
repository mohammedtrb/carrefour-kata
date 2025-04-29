import { Routes } from '@angular/router';
import { DeliveryListComponent } from './delivery-list/delivery-list.component';
import { DeliveryDetailsComponent } from './delivery-details/delivery-details.component';
import { DeliveryOwnerGuard } from './guards/delivery-owner.guard';

export const routes: Routes = [
    { path: 'deliveries', component: DeliveryListComponent }, 
     { path: 'deliveries/:id', component: DeliveryDetailsComponent, canActivate: [DeliveryOwnerGuard] },
    { path: '', redirectTo: '/deliveries', pathMatch: 'full' }
];

import { Routes } from '@angular/router';
import { DeliveryListComponent } from './delivery-list/delivery-list.component';
import { DeliveryDetailsComponent } from './delivery-details/delivery-details.component';

export const routes: Routes = [
    { path: 'deliveries', component: DeliveryListComponent }, 
     { path: 'deliveries/:id', component: DeliveryDetailsComponent },
    { path: '', redirectTo: '/deliveries', pathMatch: 'full' }
];

import { Routes } from '@angular/router';
import { DeliveryListComponent } from './delivery-list/delivery-list.component';

export const routes: Routes = [
    { path: 'deliveries', component: DeliveryListComponent },    
    { path: '', redirectTo: '/deliveries', pathMatch: 'full' }
];

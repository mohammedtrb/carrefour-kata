import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DeliveryService } from '../services/delivery.service';
import { Router } from '@angular/router';

interface Delivery {
  id: number;
  trackingNumber: string;
  customerId: number;
  deliveryAddress: string;
  deliverySlot: string;
  deliveryState: DeliveryState;
}

export enum DeliveryState {
  ACCEPTED,
  READY,
  DELAYED,
  DELIVERING,
  DELIVERED,
}

@Component({
  selector: 'app-delivery-list',
  imports: [CommonModule],
  templateUrl: './delivery-list.component.html',
  styleUrl: './delivery-list.component.css'
})
export class DeliveryListComponent {
  customerId = 1; //TODO get it later from auth service 
  deliveries: Delivery[] = [];
  errorMessage = '';
  
  constructor(private deliveryService: DeliveryService, private router: Router) { }

  ngOnInit(): void {
    this.loadDeliveries();
  }

  loadDeliveries(): void {
    this.deliveryService.getCustomerDeliveries(this.customerId).subscribe({
      next: (deliveries) => {
        this.deliveries = deliveries;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load deliveries.';
        console.error('Error loading deliveries:', error);
      }
    });
  }

  viewDetails(deliveryId: number): void {

    console.log('View details for delivery ID:', deliveryId);
    this.router.navigate(['/deliveries', deliveryId]);
  }
}

import { Component } from '@angular/core';

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
  imports: [],
  templateUrl: './delivery-list.component.html',
  styleUrl: './delivery-list.component.css'
})
export class DeliveryListComponent {
  customerId = 1; //TODO get it later from auth service 
  deliveries: Delivery[] = [];
  errorMessage = '';

  ngOnInit(): void { }
}

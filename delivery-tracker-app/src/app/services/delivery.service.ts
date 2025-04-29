import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCustomerDeliveries(customerId: number): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(`${this.apiUrl}/customer/${customerId}`);
  }

  getDeliveryById(deliveryId: number): Observable<Delivery> {
    return this.http.get<Delivery>(`${this.apiUrl}/${deliveryId}`);
  }

  updateDeliveryAddress(deliveryId: number, newAddress: string): Observable<Delivery> {
    return this.http.patch<Delivery>(`${this.apiUrl}/${deliveryId}/address`,  newAddress);
  }


  updateDeliverySlot(deliveryId: number, newSlot: string): Observable<Delivery> {
    return this.http.patch<Delivery>(`${this.apiUrl}/${deliveryId}/slot`,  newSlot );
  }


}

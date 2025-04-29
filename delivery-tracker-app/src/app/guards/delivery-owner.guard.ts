import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DeliveryService } from '../services/delivery.service';
import { switchMap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DeliveryOwnerGuard implements CanActivate {

  constructor(private deliveryService: DeliveryService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const deliveryId = +route.params['id'];
    const currentCustomerId = 1; // Simulate the current logged-in customer

    return this.deliveryService.getDeliveryById(deliveryId).pipe(
      map(delivery => {
        if (delivery && delivery.customerId === currentCustomerId) {
          return true; // User owns this delivery, allow access
        } else {
          this.router.navigate(['/deliveries']); // Redirect to the deliveries list if not owner
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['/deliveries']); // Redirect on error (e.g., delivery not found)
        return of(false);
      })
    );
  }
}
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeliveryService } from '../services/delivery.service';

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
  selector: 'app-delivery-details',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './delivery-details.component.html',
  styleUrl: './delivery-details.component.css'
})
export class DeliveryDetailsComponent {

  deliveryId: number | null = null;
  delivery: Delivery | null = null;
  errorMessage = '';
  updateForm: FormGroup;
  updateSuccessMessage = '';
  deliveryStates = DeliveryState;

   constructor(
    private route: ActivatedRoute,
    private deliveryService: DeliveryService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.updateForm = this.fb.group({
      deliveryAddress: ['', Validators.required],
      deliverySlot: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.deliveryId = +params['id']; // (+) converts string 'id' to a number
      if (this.deliveryId) {
        this.loadDeliveryDetails(this.deliveryId);
      }
    });
  }
  loadDeliveryDetails(id: number): void {
    this.deliveryService.getDeliveryById(id).subscribe({
      next: (delivery) => {
        this.delivery = delivery;
        this.updateForm.patchValue({
          deliveryAddress: delivery.deliveryAddress,
          deliverySlot: delivery.deliverySlot
        });
        this.updateForm.controls['address'].enable();
        this.updateForm.controls['deliverySlot'].enable();
        if (delivery.deliveryState === DeliveryState.READY) {
          this.updateForm.disable();
        }
        
      },
      error: (error) => {
        this.errorMessage = 'Failed to load delivery details.';
        console.error('Error loading delivery details:', error);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/deliveries']);
  }

  onSubmit(): void {
    if (this.delivery && this.updateForm.valid) {
      const newAddress = this.updateForm.value.deliveryAddress;
      const newSlot = this.updateForm.value.deliverySlot;

      console.log('Updating delivery with new address:', newAddress, 'and new slot:', newSlot);
      

      this.deliveryService.updateDeliveryAddress(this.delivery.id, newAddress).subscribe({
        next: (updatedDelivery) => {
          this.deliveryService.updateDeliverySlot(this.delivery!.id, newSlot).subscribe({
            next: (updatedDeliverySlot) => {
              this.loadDeliveryDetails(this.delivery!.id); // Reload details to show updated data
              this.updateSuccessMessage = 'Delivery details updated successfully!';
              setTimeout(() => this.updateSuccessMessage = '', 3000);
              this.goBack();
            },
            error: (error) => {
              this.errorMessage = 'Failed to update delivery slot.';
              console.error('Error updating delivery slot:', error);
            }
          });
        },
        error: (error) => {
          this.errorMessage = 'Failed to update delivery address.';
          console.error('Error updating delivery address:', error);
        }
      });
    }
  }
}

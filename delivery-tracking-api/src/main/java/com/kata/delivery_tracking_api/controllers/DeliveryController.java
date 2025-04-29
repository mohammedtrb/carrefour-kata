package com.kata.delivery_tracking_api.controllers;

import com.kata.delivery_tracking_api.Dtos.DeliveryDto;
import com.kata.delivery_tracking_api.models.DeliveryState;
import com.kata.delivery_tracking_api.services.DeliveryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/deliveries")
public class DeliveryController {

    private final DeliveryService deliveryService;

    public DeliveryController(DeliveryService deliveryService) {
        this.deliveryService = deliveryService;
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<DeliveryDto>> getDeliveriesByCustomerId(@PathVariable Long customerId) {
        return ResponseEntity.ok(deliveryService.getDeliveriesByCustomerId(customerId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DeliveryDto> getDeliveryById(@PathVariable Long id) {
        return ResponseEntity.ok(deliveryService.getDeliveryById(id));
    }

    @PatchMapping("/{id}/address")
    public ResponseEntity<DeliveryDto> updateDeliveryAddress(@PathVariable Long id, @RequestBody String newAddress) {
        return ResponseEntity.ok(deliveryService.updateDeliveryAddress(id, newAddress));
    }


    @PatchMapping("/{id}/state")
    public ResponseEntity<DeliveryDto> updateDeliveryStatus(@PathVariable Long id, @RequestBody DeliveryState newStatus) {
        return ResponseEntity.ok(deliveryService.updateDeliveryState(id, newStatus));
    }

    @PostMapping
    public ResponseEntity<DeliveryDto> createDelivery(@RequestBody DeliveryDto deliveryDto) {
        return ResponseEntity.ok(deliveryService.createDelivery(deliveryDto));
    }

    @PatchMapping("/{id}/slot")
    public ResponseEntity<DeliveryDto> updateDeliverySlot(@PathVariable Long id, @RequestBody String newSlot) {
        return ResponseEntity.ok(deliveryService.updateDeliverySlot(id, newSlot));
    }

}

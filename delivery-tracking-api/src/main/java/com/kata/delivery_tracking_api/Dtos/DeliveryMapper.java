package com.kata.delivery_tracking_api.Dtos;

import com.kata.delivery_tracking_api.models.Delivery;

public class DeliveryMapper {

    public static DeliveryDto toDto(Delivery delivery) {
        DeliveryDto dto = new DeliveryDto();
        dto.setId(delivery.getId());
        dto.setCustomerId(delivery.getCustomerId());
        dto.setDeliveryState(delivery.getDeliveryState());
        dto.setTrackingNumber(delivery.getTrackingNumber());
        dto.setDeliverySlot(delivery.getDeliverySlot());
        dto.setDeliveryAddress(delivery.getDeliveryAddress());
        dto.setCreatedAt(delivery.getCreatedAt());
        dto.setUpdatedAt(delivery.getUpdatedAt());
        return dto;
    }

    public static Delivery toEntity(DeliveryDto dto) {
        Delivery delivery = new Delivery();
        delivery.setId(dto.getId());
        delivery.setCustomerId(dto.getCustomerId());
        delivery.setDeliveryAddress(dto.getDeliveryAddress());
        delivery.setDeliverySlot(dto.getDeliverySlot());
        delivery.setDeliveryState(dto.getDeliveryState());
        delivery.setCreatedAt(System.currentTimeMillis());
        delivery.setUpdatedAt(System.currentTimeMillis());
        return delivery;
    }
}

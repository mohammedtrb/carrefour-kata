package com.kata.delivery_tracking_api.services;

import com.kata.delivery_tracking_api.Dtos.DeliveryDto;
import com.kata.delivery_tracking_api.Dtos.DeliveryMapper;
import com.kata.delivery_tracking_api.exceptions.DeliveryNotFoundException;
import com.kata.delivery_tracking_api.exceptions.InvalidRequestException;
import com.kata.delivery_tracking_api.models.DeliveryState;
import com.kata.delivery_tracking_api.repositories.DeliveryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeliveryService {

    private final DeliveryRepository deliveryRepository;

    public DeliveryService(DeliveryRepository deliveryRepository) {
        this.deliveryRepository = deliveryRepository;
    }

    public List<DeliveryDto> getDeliveriesByCustomerId(Long customerId) {
        return deliveryRepository.findByCustomerId(customerId)
                .stream()
                .map(DeliveryMapper::toDto)
                .toList();
    }

    public DeliveryDto getDeliveryById(Long id) {
        return deliveryRepository.findById(id)
                .map(DeliveryMapper::toDto)
                .orElse(null);
    }

    public DeliveryDto createDelivery(DeliveryDto deliveryDto) {
        return DeliveryMapper.toDto(deliveryRepository.save(DeliveryMapper.toEntity(deliveryDto)));
    }

    public DeliveryDto updateDeliveryState(Long id, DeliveryState deliveryState) {
        return deliveryRepository.findById(id)
                .map(existingDelivery -> {
                    existingDelivery.setDeliveryState(deliveryState);
                    return DeliveryMapper.toDto(deliveryRepository.save(existingDelivery));
                })
                .orElseThrow(() -> new DeliveryNotFoundException("Delivery not found with id: " + id));
    }

    public DeliveryDto updateDeliveryAddress(Long id, String address) {
        return deliveryRepository.findById(id)
                .map(existingDelivery -> {
                    if (!existingDelivery.getDeliveryState().equals(DeliveryState.ACCEPTED))
                        throw new InvalidRequestException("Cannot update address for a delivery that is already in the READY state");
                    existingDelivery.setDeliveryAddress(address);
                    return DeliveryMapper.toDto(deliveryRepository.save(existingDelivery));
                })
                .orElseThrow(() -> new DeliveryNotFoundException("Delivery not found with id: " + id));
    }

    public DeliveryDto updateDeliverySlot(Long id, String slot) {
        return deliveryRepository.findById(id)
                .map(existingDelivery -> {
                    if (!existingDelivery.getDeliveryState().equals(DeliveryState.ACCEPTED))
                        throw new InvalidRequestException("Cannot update slot for a delivery that is already in the READY state");
                    existingDelivery.setDeliverySlot(slot);
                    return DeliveryMapper.toDto(deliveryRepository.save(existingDelivery));
                })
                .orElseThrow(() -> new DeliveryNotFoundException("Delivery not found with id: " + id));
    }
}

package com.kata.delivery_tracking_api.config;

import com.kata.delivery_tracking_api.models.Delivery;
import com.kata.delivery_tracking_api.models.DeliveryState;
import com.kata.delivery_tracking_api.repositories.DeliveryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer implements CommandLineRunner {
    private final DeliveryRepository deliveryRepository;

    public DataInitializer(DeliveryRepository deliveryRepository) {
        this.deliveryRepository = deliveryRepository;
    }

    @Override
    public void run(String... args) {
        // Clear existing data
        deliveryRepository.deleteAll();

        // Create dummy deliveries
        Delivery delivery1 = new Delivery();
        delivery1.setTrackingNumber("TRACK123");
        delivery1.setCustomerId(1L);
        delivery1.setDeliveryAddress("123 Main Street");
        delivery1.setDeliverySlot("Morning");
        delivery1.setDeliveryState(DeliveryState.ACCEPTED);
        delivery1.setCreatedAt(System.currentTimeMillis());
        delivery1.setUpdatedAt(System.currentTimeMillis());

        // Create dummy deliveries
        Delivery delivery4 = new Delivery();
        delivery4.setTrackingNumber("TRACK1123");
        delivery4.setCustomerId(1L);
        delivery4.setDeliveryAddress("123 Main Street");
        delivery4.setDeliverySlot("Morning");
        delivery4.setDeliveryState(DeliveryState.ACCEPTED);
        delivery4.setCreatedAt(System.currentTimeMillis());
        delivery4.setUpdatedAt(System.currentTimeMillis());

        Delivery delivery2 = new Delivery();
        delivery2.setTrackingNumber("TRACK456");
        delivery2.setCustomerId(2L);
        delivery2.setDeliveryAddress("456 Elm Street");
        delivery2.setDeliverySlot("Afternoon");
        delivery2.setDeliveryState(DeliveryState.READY);
        delivery2.setCreatedAt(System.currentTimeMillis());
        delivery2.setUpdatedAt(System.currentTimeMillis());

        Delivery delivery3 = new Delivery();
        delivery3.setTrackingNumber("TRACK789");
        delivery3.setCustomerId(3L);
        delivery3.setDeliveryAddress("789 Oak Avenue");
        delivery3.setDeliverySlot("Evening");
        delivery3.setDeliveryState(DeliveryState.DELIVERING);
        delivery3.setCreatedAt(System.currentTimeMillis());
        delivery3.setUpdatedAt(System.currentTimeMillis());

        // Save deliveries to the database
        deliveryRepository.save(delivery1);
        deliveryRepository.save(delivery2);
        deliveryRepository.save(delivery3);
        deliveryRepository.save(delivery4);
    }
}

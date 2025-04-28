package com.kata.delivery_tracking_api.repositories;

import com.kata.delivery_tracking_api.models.Delivery;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DeliveryRepository extends JpaRepository<Delivery, Long> {

    List<Delivery> findByCustomerId(Long customerId);
}

package com.myprojects.HappyShopping_backend.service;

import com.myprojects.HappyShopping_backend.dto.Purchase;
import com.myprojects.HappyShopping_backend.dto.PurchaseResponse;
import com.myprojects.HappyShopping_backend.entity.Customer;
import com.myprojects.HappyShopping_backend.entity.Order;
import com.myprojects.HappyShopping_backend.entity.OrderItem;
import com.myprojects.HappyShopping_backend.repository.CustomerRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImpl implements CheckoutService{
    @Autowired
    private CustomerRepository customerRepository;

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {

        Order order=purchase.getOrder();

        String orderTrackingNumber=generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);


        Set<OrderItem> orderItems=purchase.getOrderItems();
        orderItems.forEach(order::add);
//        order.setOrderItems(orderItems);

        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());


        Customer customer=purchase.getCustomer();
        customer.add(order);

        customerRepository.save(customer);
        System.out.println("order total price"+order.getTotalPrice());
        System.out.println("orders "+customer.getOrders());
        return new PurchaseResponse(orderTrackingNumber);
    }

    private String generateOrderTrackingNumber() {
        return UUID.randomUUID().toString();
    }
}

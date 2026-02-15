package com.myprojects.HappyShopping_backend.dto;

import com.myprojects.HappyShopping_backend.entity.Address;
import com.myprojects.HappyShopping_backend.entity.Customer;
import com.myprojects.HappyShopping_backend.entity.Order;
import com.myprojects.HappyShopping_backend.entity.OrderItem;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Setter
@Getter
public class Purchase {
    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}

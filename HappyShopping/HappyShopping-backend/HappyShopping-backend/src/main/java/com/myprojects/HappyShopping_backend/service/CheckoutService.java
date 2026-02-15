package com.myprojects.HappyShopping_backend.service;

import com.myprojects.HappyShopping_backend.dto.Purchase;
import com.myprojects.HappyShopping_backend.dto.PurchaseResponse;

public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);
}

package com.myprojects.HappyShopping_backend.controller;


import com.myprojects.HappyShopping_backend.dto.Purchase;
import com.myprojects.HappyShopping_backend.dto.PurchaseResponse;
import com.myprojects.HappyShopping_backend.service.CheckoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/checkout")
public class CheckoutController {

    @Autowired
    private CheckoutService checkoutServiceImpl;

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase){
        return checkoutServiceImpl.placeOrder(purchase);
    }
}

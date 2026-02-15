package com.myprojects.HappyShopping_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class PurchaseResponse {
    private String orderTrackingNumber;
}

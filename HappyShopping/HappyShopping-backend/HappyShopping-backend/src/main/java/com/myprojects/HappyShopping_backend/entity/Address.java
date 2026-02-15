package com.myprojects.HappyShopping_backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
//import lombok.Getter;
//import lombok.Setter;

@Entity
@Table(name = "address")
@Setter
@Getter
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "country")
    private String country;

    @Column(name = "state")
    private String state;

    @Column(name = "city")
    private String city;

    @Column(name = "street")
    private String street;

    @Column(name = "pin_code")
    private String pinCode;

    @OneToOne
    @PrimaryKeyJoinColumn
    private Order order;

}

package com.myprojects.HappyShopping_backend.repository;

import com.myprojects.HappyShopping_backend.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer,Long> {
}

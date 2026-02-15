package com.myprojects.HappyShopping_backend.repository;

import com.myprojects.HappyShopping_backend.entity.Product;
import com.myprojects.HappyShopping_backend.entity.ProductCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
public interface ProductCategoryRepository extends JpaRepository<ProductCategory,Long> {

}

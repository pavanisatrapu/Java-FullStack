package com.myprojects.HappyShopping_backend.config;


import com.myprojects.HappyShopping_backend.entity.Country;
import com.myprojects.HappyShopping_backend.entity.Product;
import com.myprojects.HappyShopping_backend.entity.ProductCategory;
import com.myprojects.HappyShopping_backend.entity.State;
import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;


@Configuration
public class RestConfig implements RepositoryRestConfigurer {
    private EntityManager entityManager;
    @Autowired
    public RestConfig(EntityManager entityManager){
        this.entityManager=entityManager;
    }
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration configuration, CorsRegistry corsRegistry){
        HttpMethod[] unSupportedActions={HttpMethod.PUT,HttpMethod.POST,HttpMethod.DELETE};
        disableHttpMethods(Product.class,configuration,unSupportedActions);
        disableHttpMethods(ProductCategory.class,configuration,unSupportedActions);
        disableHttpMethods(Country.class,configuration,unSupportedActions);
        disableHttpMethods(State.class,configuration,unSupportedActions);
        exposeEntityIds(configuration);
    }
    private static void disableHttpMethods(Class theClass,RepositoryRestConfiguration configuration, HttpMethod[] unSupportedActions) {
        configuration.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(unSupportedActions)))
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(unSupportedActions)));
    }
    private void exposeEntityIds(RepositoryRestConfiguration configuration) {
        Set<EntityType<?>> entities=entityManager.getMetamodel().getEntities();
        List<Class> entityClasses=new ArrayList<>();
        for (EntityType tempEntityType:entities){
            entityClasses.add(tempEntityType.getJavaType());
        }
        Class[] domainTypes=entityClasses.toArray(new Class[0]);
        configuration.exposeIdsFor(domainTypes);
    }
}

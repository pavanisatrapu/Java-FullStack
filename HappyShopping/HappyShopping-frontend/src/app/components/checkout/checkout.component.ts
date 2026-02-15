import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../service/cart.service';
import { FormsService } from '../../service/forms.service';
import { Country } from '../../common/country';
import { State } from '../../common/state';
import { CustomeValidators } from '../../validators/custome-validators';
import { CheckoutService } from '../../service/checkout.service';
import { Router } from '@angular/router';
import { Order } from '../../common/order';
import { OrderItem } from '../../common/order-item';
import { Purchase } from '../../common/purchase';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{

  checkoutFormGroup! :FormGroup;
  
  cartList: CartItem[] = [];
  tempTotalPrice: undefined;
  totalPrice: number = 0.00;
  totalQuantity: number = 0;
  subTotal: number = 0.00;

  creditCardYears:number[]=[];
  creditCardMoths:number[]=[];

  countries:Country[]=[]
  shippingAddressStates:State[]=[];
  billingAddressStates:State[]=[];

  constructor(private cartService: CartService,
              private formsService: FormsService,
              private formBuilder:FormBuilder,
              private checkoutService:CheckoutService,
              private route:Router) { }
  ngOnInit(): void {
      this.handleCheckoutForm();
      this.displayCartItems();
      this.initializeYears();
      this.displayCountries()
      this.handleTempTotalPrice();
  }
  
  handleCheckoutForm(){
    this.checkoutFormGroup=this.formBuilder.group({
      customer:this.formBuilder.group({
        firstName:new FormControl('',
                                    [Validators.required,
                                    Validators.minLength(2),
                                    CustomeValidators.notOnlyWhitespace]
                                  ),
        lastName:new FormControl('',
                                    [Validators.required,
                                      Validators.minLength(2),
                                      CustomeValidators.notOnlyWhitespace]
                                ),
        email:new FormControl('',
                                  [Validators.required,
                                  Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]
                              )
      }),
      shippingDetails:this.formBuilder.group({
        country:new FormControl('',
                                  Validators.required
                                ),
        state:new FormControl('',
                                Validators.required
                              ),
        city:new FormControl('',
                              [Validators.required,Validators.minLength(2),CustomeValidators.notOnlyWhitespace]
                            ),
        street:new FormControl('',
                                  [Validators.required,Validators.minLength(2),CustomeValidators.notOnlyWhitespace]
                                ),
        pinCode:new FormControl('',
                                  [Validators.required,Validators.pattern('[0-9]{6}'),CustomeValidators.notOnlyWhitespace]
                                  )
      }),
      billingDetails:this.formBuilder.group({
        country:new FormControl('',
                                  Validators.required
                                ),
        state:new FormControl('',
                                Validators.required
                              ),
        city:new FormControl('',
                              [Validators.required,Validators.minLength(2),CustomeValidators.notOnlyWhitespace]
                            ),
        street:new FormControl('',
                                  [Validators.required,Validators.minLength(2),CustomeValidators.notOnlyWhitespace]
                                ),
        pinCode:new FormControl('',
                                  [Validators.required,Validators.pattern('[0-9]{6}'),CustomeValidators.notOnlyWhitespace]
                                  )
      }),
      creditCard:this.formBuilder.group({
        cardType:new FormControl('',
                                    Validators.required
                                ),
        nameOnCard:new FormControl('',
                                      [Validators.required,Validators.minLength(2),Validators.pattern('[a-zA-Z]+'),CustomeValidators.notOnlyWhitespace]
                                  ),
        cardNumber:new FormControl('',
                                    [Validators.required,Validators.pattern('[0-9]{16}')]
                                  ),
        cvv:new FormControl('',
                            [Validators.required,Validators.pattern('[0-9]{3}')]
                    ),
        expirationYear:[''],
        expirationMonth:['']    
        
      })
    });
  }
  displayCartItems() {
    this.cartList = this.cartService.cartItems;
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
    this.cartService.calculatecartTotals();
  }
  handleTempTotalPrice(){
    
  }
  incrementQuantity(tempCartItem:CartItem){
    this.cartService.addToCart(tempCartItem);
  }
  decrementQuantity(tempCartItem:CartItem){
    this.cartService.decrementQuantity(tempCartItem);
  }
  removeCartItem(tempCartItem:CartItem){
    this.cartService.removeCartItem(tempCartItem);
  }
  get firstName(){ return this.checkoutFormGroup.get('customer.firstName');}
  get lastName(){ return this.checkoutFormGroup.get('customer.lastName');}
  get email(){ return this.checkoutFormGroup.get('customer.email');}

  get shippingCountry(){ return this.checkoutFormGroup.get('shippingDetails.country');}
  get shippingState(){ return this.checkoutFormGroup.get('shippingDetails.state');}
  get shippingCity(){ return this.checkoutFormGroup.get('shippingDetails.city');}
  get shippingStreet(){ return this.checkoutFormGroup.get('shippingDetails.street');}
  get shippingPincode(){ return this.checkoutFormGroup.get('shippingDetails.pinCode');}
 
  get billingCountry(){ return this.checkoutFormGroup.get('billingDetails.country');}
  get billingState(){ return this.checkoutFormGroup.get('billingDetails.state');}
  get billingCity(){ return this.checkoutFormGroup.get('billingDetails.city');}
  get billingStreet(){ return this.checkoutFormGroup.get('billingDetails.street');}
  get billingPincode(){ return this.checkoutFormGroup.get('billingDetails.pinCode');}
 
  get creditCardType(){ return this.checkoutFormGroup.get('creditCard.cardType');}
  get creditCardNameOnCard(){ return this.checkoutFormGroup.get('creditCard.nameOnCard');}
  get creditCardNumber(){ return this.checkoutFormGroup.get('creditCard.cardNumber');}
  get creditCardCVV(){ return this.checkoutFormGroup.get('creditCard.cvv');}

  copyShippingAddressToBillingAddress(event:any) {
    if(event.target.checked){
      this.checkoutFormGroup.controls['billingDetails']
      .setValue(this.checkoutFormGroup.controls['shippingDetails'].value)
      this.billingAddressStates=this.shippingAddressStates;
    }
    else{
      this.checkoutFormGroup.controls['billingDetails'].reset();
      this.billingAddressStates=[];
    }
  }
  initializeYears(){
    this.creditCardYears=[];
    this.creditCardMoths=[];
    const currentYear:number=new Date().getFullYear();
    const currentMonth:number=new Date().getMonth()+1;
    for(let i=currentYear;i<=currentYear+10;i++){
      this.creditCardYears.push(i);
    }
    for(let i=currentMonth;i<=12;i++){
      this.creditCardMoths.push(i);
    }
    // console.log(this.checkoutFormGroup.get('creditCard')?.value.expirationYear);
    // console.log(this.checkoutFormGroup.get('creditCard')?.value.expirationMonth);
  }
  handleMonthsBasedOnYear(){
    this.creditCardMoths=[];
    const currentYear:number=new Date().getFullYear();
    const currentMonth:number=new Date().getMonth()+1;
    const creditCardFormGroup=this.checkoutFormGroup.get('creditCard');
    let j:number=0;
    if(currentYear===Number(creditCardFormGroup?.value.expirationYear)){
      j=currentMonth;
    }
    else{
      j=1;
    }
    for(let i=j;i<=12;i++){
      this.creditCardMoths.push(i);
    }
    // console.log(this.checkoutFormGroup.get('creditCard')?.value.expirationYear);
    // console.log(this.checkoutFormGroup.get('creditCard')?.value.expirationMonth);
  }

  displayCountries() {
    this.formsService.getCountries().subscribe(
      data=>{
        this.countries=data;
        
      }
    );
  }
  getStates(formGroupName: string) {
    const formGroup=this.checkoutFormGroup.get(formGroupName);
    const countryCode=formGroup?.value.country.code;
    this.formsService.getStates(countryCode).subscribe(
      data=>{
        if(formGroupName==='shippingDetails'){
          this.shippingAddressStates=data;
        }
        else{
          this.billingAddressStates=data;
        }
        formGroup?.get('state')?.setValue(data[0]);
      }
    );
    }
    onSubmit(){
      if(this.checkoutFormGroup.invalid){
        this.checkoutFormGroup.markAllAsTouched();
        return;
      }
      let order=new Order();
      // console.log(this.totalPrice);
      order.totalPrice=this.totalPrice;
      order.totalQuantity=this.totalQuantity;

      const cartItems=this.cartService.cartItems;

      let orderItems:OrderItem[]=cartItems.map(
        tempCartItem=>new OrderItem(tempCartItem)
      )
      let purchase=new Purchase();
      purchase.customer=this.checkoutFormGroup.controls['customer'].value;

      
      purchase.shippingAddress=this.checkoutFormGroup.controls['shippingDetails'].value;
      const shippingState:State=JSON.parse(JSON.stringify(purchase.shippingAddress.state));
      const shippingCountry:Country=JSON.parse(JSON.stringify(purchase.shippingAddress.country));
      purchase.shippingAddress.state=shippingState.name;
      purchase.shippingAddress.country=shippingCountry.name;

      purchase.billingAddress=this.checkoutFormGroup.controls['billingDetails'].value;
      const billingState:State=JSON.parse(JSON.stringify(purchase.billingAddress.state));
      const billingCountry:Country=JSON.parse(JSON.stringify(purchase.billingAddress.country));
      purchase.billingAddress.state=billingState.name;
      purchase.billingAddress.country=billingCountry.name;
      if(this.totalPrice<100){
        order.totalPrice+=40;
      }
      purchase.order=order;
      purchase.orderItems=orderItems;

      this.checkoutService.placeOrder(purchase).subscribe({
          next:response=>{
            // alert(`Your order has been received.\nOrder tracking number is ${response.orderTrackingNumber}`);
            this.route.navigateByUrl(`/orderPlaced/${response.orderTrackingNumber}/${this.totalPrice}/${this.totalQuantity}`);
            this.resetCart();
          },
          error:err=>{
            alert(`there was an error :${err.message}, Try again later`);
          }
        }
      );
    }
  resetCart() {
    
    this.cartService.cartItems=[];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    this.checkoutFormGroup.reset();
    // this.route.navigateByUrl("/products");
    
  }
}

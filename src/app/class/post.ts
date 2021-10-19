// signup post
export class SignUpPost{
    constructor(
        public name:string,
        public phone : number,
        public password : string,
    ) {}
}
// getting sign up data
export class signupData{
    name : string | undefined;
    phone : number | undefined ;
    password : string | undefined;
    email : undefined | undefined;
    otp : number | undefined;
}

// sending login data
export class loginUp{
    phone : any | undefined;
    password : undefined | undefined;
    name:string | undefined;
    email : undefined | undefined;
    otp : number | undefined;
    unique_code : undefined | undefined;
}

// customer PAN Card Update
export class panUpdate{
    pan_number : number | undefined;
    pan_image : File | undefined;
    pan_card_full_name:string | undefined;
    pan_approved_By_Customer: number | undefined;
}

export class pin{
  delivery_postcode : number | undefined;
  prtid : number | undefined;
}

// general details edit
export class generalDetailsSettings{
    name:string |undefined ;
    phone : number | undefined ;
    email : string | undefined;
}

// product relation table id
export class postProductId{
    prtid : number | undefined;
}

// address addition
export class addressAddition{
    cust_id_logined : number | undefined ;
    name : string | undefined;
    phone : number | undefined;
    pincode : number | undefined;
    locality : string | undefined;
    address : string | undefined;
    city : string | undefined;
    state : string | undefined;
    landmark : string | undefined;
    address_Type : string | undefined;
}


export class phonenumber{
    phone : number | undefined;
}
// add cart post msn to cart
export class addDataCart{
    msn : undefined | undefined ;
}

// export msn post method
export class msnExportFromCart{
    msnArray : undefined | undefined;
    qunatity : undefined | undefined;
}

// post address id
export class addressId{
    addressId : number |undefined;
    msnArray : undefined | undefined;
}

// orderOverView
export class orderOverViewPostMSN{
    msnArray : undefined | undefined;
}

export class mode{
    msnArray : undefined | undefined;
}

// orderOverView
export class paymentAddData{
    msnArray : undefined | undefined;
    modeOfPayment : string | undefined;
    razorpay_payment_id : undefined | undefined;
    razorpay_signature : undefined | undefined;
}

export class thankYou{
    msnArray : undefined | undefined;
}

export class resetPassword{
    otp:number | undefined;
    phone : number | undefined;
    password : string | undefined;
    confirmPassword : string | undefined;

}

export class questionAsking{
  question : string | undefined;
}

export class Headings {
    Name: string | undefined;
    Phone : number | undefined ;
    Pan_Number : string |undefined;
}


export class ProductsHeadings {
    pcolorId :number | undefined;
    prtid : number | undefined;
    pid: number | undefined;
    p_name : string | undefined ;
    description : string |undefined;
    productImage:undefined | undefined;
    imgurl : undefined | undefined;
    short_description: string | undefined;
    tag : string | undefined ;
    sku : undefined |undefined;
    discount_price: number |undefined;
    original_price: number |undefined;
    stock_quantity : number | undefined;
    low_stock_threshold : number | undefined;
    msn:string | undefined;
}


export class ratingsPost{
  rating:number | undefined;
  review : string | undefined;
  rating_head:undefined | undefined;
}
export class ProductPID {
    pid: number | undefined;

}

export class colors{
    color: String | undefined;
    cust_attr :String| undefined;
    // cust_attr : [] as array;
}

export class ProductPIDHeadings{
  COD: String | undefined;
  Prepaid: String | undefined;
  exchangeDuration: number | undefined;
  warenty_duration_type: number | undefined;
  refurndDuration: number | undefined;
    colorRelation : undefined | undefined;
    msn:undefined | undefined;
    prtid: number | undefined;
    pid: number | undefined;
    p_name : string | undefined ;
    p_discription : string |undefined;
    productImage:undefined | undefined;
    imgurl : undefined | undefined;
    p_short_descripition: string | undefined;
    p_tag : string | undefined ;
    sku : undefined |undefined;
    height: number | undefined;
    weight : number | undefined ;
    length : number |undefined;
    width : number |undefined;
    unit : undefined | undefined;
    pricings : undefined | undefined;
    color_detail:undefined | undefined;
    specifications:undefined | undefined;
    highlight:undefined | undefined;

}

export class ProductDetailsCart {
    prtid : number | undefined;
    p_name : string | undefined ;
    productImage : undefined | undefined;
    color : string | undefined;
    attribute_name : string | undefined ;
    cust_attr_value : string | undefined ;
    qty : number | undefined ;
    sellar_name : string | undefined;
    original_price : number | undefined;
    discounted_price : number | undefined ;
    length : number | undefined ;
    msn : string | undefined ;
}

export class ordersDone {
    attribute_name : string | undefined;
    color : string | undefined;
    cust_attr_value : string | undefined;
    grand_total_price : number | undefined ;
    imgurl : undefined | undefined;
    order_id : undefined | undefined;
    p_name : string | undefined;
    name : string | undefined ;
    created_at: undefined | undefined;
    order_status:number | undefined;
}

export class orderDetails {
    attribute_name : string | undefined;
    color : string | undefined;
    cust_attr_value : string | undefined;
    grand_total_price : number | undefined ;
    imgurl : undefined | undefined;
    order_id : undefined | undefined;
    p_name : string | undefined;
    name : string | undefined ;
    created_at: undefined | undefined;
    order_status:number | undefined;
    cust_Name : undefined | undefined;
    cust_address:string | undefined;
    custState : string | undefined;
    custCity : string | undefined;
    custPincode : string | undefined;
    custLandMark : string | undefined
    order_phone : number | undefined
    shipment_id : number | undefined;
    invoice_url: undefined | undefined;
    refund_done: undefined | undefined;
}

export class image{
    imgurl :undefined|undefined;
}

export class brand{
    brand_name : undefined | undefined;
    brandLogo : undefined | undefined;
    brandid : undefined | undefined;
}

export class path{
    outer_Category_name : string | undefined;
    category_name : string | undefined;
    sub_category_name : string | undefined;
}



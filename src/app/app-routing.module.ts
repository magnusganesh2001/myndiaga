import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'accountGuestCart',
    loadChildren: () => import('./guestcart/guestcart.module').then( m => m.GuestcartPageModule)
  },
  {
    path: 'accountCartAddress',
    loadChildren: () => import('./cart-address/cart-address.module').then( m => m.CartAddressPageModule)
  },
  
  {
    path: 'accountLogin',
    loadChildren: () => import('./account-login/account-login.module').then( m => m.AccountLoginPageModule)
  },
  {
    path: 'accountOrderDetails/:order_id',
    loadChildren: () => import('./order-detail/order-detail.module').then( m => m.OrderDetailPageModule)
  },
  {
    path: 'all-category',
    loadChildren: () => import('./all-category/all-category.module').then( m => m.AllCategoryPageModule)
  },
  {
    path: 'accountOrders',
    loadChildren: () => import('./my-order/my-order.module').then( m => m.MyOrderPageModule)
  },
  {
    path: 'accountOrderBooked',
    loadChildren: () => import('./thankyou-order/thankyou-order.module').then( m => m.ThankyouOrderPageModule)
  },
  {
    path: 'accountCartOrderOverview',
    loadChildren: () => import('./order-summary/order-summary.module').then( m => m.OrderSummaryPageModule)
  },
  {
    path: 'wishlist',
    loadChildren: () => import('./wishlist/wishlist.module').then( m => m.WishlistPageModule)
  },
  {
    path: 'all-products/:title/:id',
    loadChildren: () => import('./all-products/all-products.module').then( m => m.AllProductsPageModule)
  },
  {
    path: 'accountCartPayment',
    loadChildren: () => import('./order-payment/order-payment.module').then( m => m.OrderPaymentPageModule)
  },
  {
    path: 'accountSettings',
    loadChildren: () => import('./account-setting/account-setting.module').then( m => m.AccountSettingPageModule)
  },
  {
    path: 'accountNavigation',
    loadChildren: () => import('./account-navigation/account-navigation.module').then( m => m.AccountNavigationPageModule)
  },
  {
    path: 'accountAddress',
    loadChildren: () => import('./account-address/account-address.module').then( m => m.AccountAddressPageModule)
  },
  {
    path: 'accountPassword',
    loadChildren: () => import('./account-password/account-password.module').then( m => m.AccountPasswordPageModule)
  },
  {
    path: 'accountPAN',
    loadChildren: () => import('./account-pan/account-pan.module').then( m => m.AccountPANPageModule)
  },
  {
    path: 'accountBankDetails',
    loadChildren: () => import('./account-bank-details/account-bank-details.module').then( m => m.AccountBankDetailsPageModule)
  },
  {
    path: 'accountCart',
    loadChildren: () => import('./cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: ':category', 
    loadChildren: () => import('./category/category.module').then( m => m.CategoryPageModule)
  },
  {
    path: ':category/:subcategory',
    loadChildren: () => import('./sub-category/sub-category.module').then( m => m.SubCategoryPageModule)
  },
  {
    path: ':category/:subcategory/:productList',
    loadChildren: () => import('./product-list/product-list.module').then( m => m.ProductListPageModule)
  },
  {
    path: ':category/:subcategory/:productList/:product',
    loadChildren: () => import('./product-detail/product-detail.module').then( m => m.ProductDetailPageModule)
  },
  



 

 

  
 


 

 


 

 





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

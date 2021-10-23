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
    path: 'all-category',
    loadChildren: () => import('./all-category/all-category.module').then( m => m.AllCategoryPageModule)
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
  {
    path: 'accountGuestCart',
    loadChildren: () => import('./guestcart/guestcart.module').then( m => m.GuestcartPageModule)
  },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

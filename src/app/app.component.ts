import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/folder/Inbox', icon: 'home' },
    { title: 'All Category', url: '/folder/Outbox', icon: 'grid' },
    { title: 'My Orders', url: '/folder/Favorites', icon: 'push' },
    { title: 'My Cart', url: '/folder/Archived', icon: 'cart' },
    { title: 'My Wishlist', url: '/folder/Trash', icon: 'heart' },
    { title: 'My Account', url: '/folder/Spam', icon: 'person' },

    { title: 'Pan Card', url: '/folder/pan', icon: 'card' },
    { title: 'Change Password', url: '/folder/password', icon: 'key' },

    { title: 'Address', url: '/folder/address', icon: 'locate' },
    { title: 'Bank Details', url: '/folder/cash', icon: 'cash' },
    { title: 'Rating And Reviews', url: '/folder/rating', icon: 'star' },
  ];
  constructor() {}
}

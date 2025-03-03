import { CartService } from './../../core/services/cart/cart.service';
import { Component, inject, input, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/myTranslate/my-translate.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly myTranslateService = inject(MyTranslateService);
  private readonly translateService = inject(TranslateService);
  private readonly CartService = inject(CartService);

  isLogin = input<boolean>(true);
  countCart!: number;
  ngOnInit(): void {
    this.CartService.cartNumber.subscribe({
      next: (value) => {
        this.countCart = value;
      },
    });
    if (localStorage?.getItem('token'))
      this.CartService.getLoggedUserCart().subscribe({
        next: (res) => {
          this.CartService.cartNumber.next(res.numOfCartItems);
        },
      });
  }
  
  logOut(): void {
   
    this.authService.logoutUser();
  }
  change(lang: string): void {
    this.myTranslateService.changeLangTranslate(lang);
  }

  currentLang(lang: string): boolean {
    return this.translateService.currentLang === lang;
  }
}

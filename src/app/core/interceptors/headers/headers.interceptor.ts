// import { HttpInterceptorFn } from '@angular/common/http';

// export const headersInterceptor: HttpInterceptorFn = (req, next) => {
//   if (localStorage != undefined && localStorage?.getItem('token')) {
//     if (
//       req.url.includes('cart') ||
//       req.url.includes('orders') ||
//       req.url.includes('wishlist')
//     ) {
//       req = req.clone({
//         setHeaders: {
//           token: localStorage?.getItem('token')!,
//           lang: localStorage?.getItem('lang')!,
//         },
//       });
//     }
//   }

//   return next(req);
// };

import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const token = localStorage.getItem('token');
    const lang = localStorage.getItem('lang');

    if (
      token &&
      (req.url.includes('cart') ||
        req.url.includes('orders') ||
        req.url.includes('wishlist'))
    ) {
      req = req.clone({
        setHeaders: {
          token: token,
          lang: lang || 'en',
        },
      });
    }
  }

  return next(req);
};

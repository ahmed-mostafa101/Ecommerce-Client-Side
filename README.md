# Ecommerce Client Side Application

This repository contains the client-side code for an E-commerce application built using Angular. The application provides a complete online shopping experience, from browsing products to managing the cart and processing orders

# Project Structure


```plaintext
public/
|
src/
│
├── app/
│   ├── core/
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   ├── cart.service.ts
|   |   |   ├── orders.service.ts
│   │   │   ├── product.service.ts
│   │   │   ├── user.service.ts
│   │   │   |
│   │   └── guards/ 
│   │       └── auth.guard.ts
│   │
│   ├── shared/
│   │   ├── components/
│   │   │   ├── header/
│   │   │   ├── footer/
│   │   │   ├── navbar/
│   │   │   ├── product-card/
│   │   │   |
│   │   ├── models/
│   │   |   ├── cart.model.ts
│   │   |   ├── orders.model.ts
│   │   |   ├── product.model.ts
│   │   |   └── user.model.ts
|   |   |
│   │   └── pipes/
│   │       └── rating.pipe.ts
│   │
│   ├── features/
│   │   ├── products/
│   │   │   ├── product-list/
│   │   │   ├── product-showcase/
│   │   │   ├── product-reviews/
│   │   │   ├── best-seller/
│   │   │
│   │   ├── cart/
│   │   │
│   │   ├── checkout/
│   │   │
│   │   ├── orders/
│   │   │   ├── orders-list/
│   │   │   ├── order-showcase/
│   │   │
│   │   ├── user/
│   │       ├── login/
│   │       ├── register/
│   │       └── profile/
│   │
│   ├── app.component.ts
│   ├── app.component.html
│   ├── app.component.css
│   ├── app.config.ts
│   └── app.routes.ts
│
└── index.html
└── style.css
└── main.ts

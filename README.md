# E-commerce Platform (Client Side)
Technologies: HTML | CSS | TypeScript | Angular | REST APIs

- Developed a dynamic, responsive front-end for an e-commerce platform using the Angular framework.
- Implemented product listing with filtering, sorting, and pagination for improved user navigation.
- Integrated JWT-based authentication and authorization to manage secure user access.
- Built a shopping cart with add, update, remove features, real-time pricing, and checkout process.
- Utilized Angular services to manage state and maintain a clean separation of concerns.
- Ensured a mobile-first design and optimized application performance for better user experience.


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

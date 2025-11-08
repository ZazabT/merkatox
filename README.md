# 🛍️ Merkatox - Modern E-Commerce Platform

A feature-rich, responsive e-commerce platform built with Next.js 14, TypeScript, Redux Toolkit, and Tailwind CSS.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Redux](https://img.shields.io/badge/Redux-Toolkit-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-cyan)

## ✨ Features

### 🛒 Shopping Experience
- **Product Browsing** - Grid layout with 12 products per page
- **Advanced Search** - Real-time search with 500ms debouncing
- **Smart Filtering** - Category filters and multiple sort options
- **Product Details** - Image gallery, reviews, similar products
- **Shopping Cart** - Add/remove items, quantity control, persistent storage
- **Favorites System** - Save favorite products with Redux persistence

### 🎨 UI/UX
- **Interactive Hero Section** - Hover-triggered cards with smooth animations
- **Responsive Design** - Mobile-first approach, works on all devices
- **Dark Mode** - Full theme support with next-themes
- **Smooth Animations** - Framer Motion-like transitions
- **Loading States** - Skeleton loaders for better UX
- **Toast Notifications** - Real-time feedback with Sonner

### 🔧 Product Management
- **Create Products** - Add new products with form validation
- **Edit Products** - Update existing product information
- **Delete Products** - Remove products with confirmation dialog

### 📱 Responsive Navigation
- **Desktop Menu** - Full navigation with all links
- **Mobile Menu** - Hamburger menu with slide-out drawer
- **Favorites Badge** - Real-time count of favorited items
- **Announcement Banner** - Dismissible top header with infinite scroll

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd merkatox
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
npm run build
npm run start
```

## 📁 Project Structure

```
merkatox/
├── app/                      # Next.js App Router
│   ├── page.tsx             # Home page
│   ├── cart/                # Shopping cart
│   ├── favorites/           # Favorites page
│   ├── product/[id]/        # Product details
│   ├── create-product/      # Create product
│   └── edit-product/[id]/   # Edit product
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── Header.tsx           # Responsive navbar
│   ├── HeroSection.tsx      # Interactive hero
│   ├── ProductCard.tsx      # Product card
│   └── ...
├── lib/                     # Utilities
│   ├── api/                 # API functions
│   └── redux/               # Redux store & slices
├── types/                   # TypeScript types
└── public/                  # Static assets
```

## 🛠️ Tech Stack

### Core
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **React 18** - Latest React features

### State Management
- **Redux Toolkit** - Global state management
- **Redux Persist** - State persistence

### Styling
- **Tailwind CSS** - Utility-first CSS
- **shadcn/ui** - High-quality components
- **Lucide React** - Beautiful icons

### Data & API
- **Axios** - HTTP client
- **DummyJSON API** - Product data source

### UI/UX
- **next-themes** - Theme management
- **Sonner** - Toast notifications
- **Framer Motion** - Animations (optional)

## 🎯 Key Features Explained

### Interactive Hero Section
Hover over the left or right image to reveal promotional cards:
- **Left hover** → Purple "New Arrivals" card appears on right
- **Right hover** → Blue "Best Sellers" card appears on left
- Smooth slide-in animations with 700ms transitions

### Responsive Navigation
- **Desktop**: Full menu with Products, Favorites, and Create buttons
- **Mobile**: Hamburger menu with slide-out drawer
- **Adaptive**: Logo size adjusts based on screen size

### Smart Product Filtering
- **Search**: Real-time with debouncing
- **Categories**: Dynamic from API
- **Sort Options**: Price, Rating, Name
- **Clear Filters**: One-click reset
- **Results Counter**: "Showing 1-12 of 50 products"

### Redux State Management
Two main slices:
1. **Cart Slice** - Shopping cart with add/remove/update
2. **Favorites Slice** - Favorite products with toggle
3. **UI Slice** - UI state (top header visibility)

## 📊 API Integration

Uses DummyJSON API for product data:
- `GET /products` - Fetch products with pagination
- `GET /products/:id` - Get single product
- `GET /products/search` - Search products
- `GET /products/categories` - Get categories
- `POST /products/add` - Create product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product

## 🎨 Design Features

- **Glassmorphism** - Backdrop blur effects
- **Gradient Accents** - Purple/pink and blue/cyan gradients
- **Shadow Layers** - Multiple shadow depths
- **Smooth Transitions** - 300-700ms animations
- **Hover Effects** - Scale, shadow, and color changes
- **Dark Mode** - Full theme support

## 📝 Documentation

For detailed documentation, see [PROJECT_DOCUMENTATION.md](./PROJECT_DOCUMENTATION.md)

## 🔮 Future Enhancements

- [ ] User authentication
- [ ] Payment integration (Stripe/PayPal)
- [ ] Order management
- [ ] Product reviews
- [ ] Wishlist per user
- [ ] Multi-language support
- [ ] PWA features
- [ ] Analytics dashboard

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [DummyJSON](https://dummyjson.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)

---

**Built with ❤️ using Next.js 14**

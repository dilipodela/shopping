# 🛍️ Modern E-Commerce React Native App

A premium, fluid, and animated e-commerce application built with **Expo**, **React Native**, and **NativeWind**. 

This project demonstrates advanced UI/UX patterns including spring physics animations, floating side drawers, gesture-based modals, and smart state management.

---

## 🚀 Tech Stack

- **Framework**: [Expo](https://expo.dev/) (React Native)
- **Routing**: [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing)
- **Styling**: [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for React Native)
- **Icons**: [Ionicons](https://icons.expo.fyi/)
- **Animations**: `Animated` API (Spring Physics) & `PanResponder` (Gestures)

---

## 📂 Project Structure & Code Map

Here is exactly where everything lives. If you need to edit something, look here first.

### 1. **App Routing (`/app`)**
The entry point and screens of the application.
- **[`_layout.tsx`](app/_layout.tsx)**: The **Root Layout**. It wraps the app in *Context Providers* (`BagProvider`, `DrawerProvider`, etc.) and sets up the global stack navigator.
- **[`index.tsx`](app/index.tsx)**: The **Home Screen**. Assembles the Header, Banners, and Product Grid.
- **[`search.tsx`](app/search.tsx)**: The **Search Screen**.
- **[`bag.tsx`](app/bag.tsx)**: The **Shopping Bag Screen**.
- **[`favorites.tsx`](app/favorites.tsx)**: The **Wishlist Screen**.

### 2. **State Management (`/context`)**
We use React Context API to manage global state without complex libraries like Redux.
- **[`BagContext.tsx`](context/BagContext.tsx)**: 
    - Manages the cart (`bagItems`).
    - Logic for **Smart Add-to-Bag**: `addToBag`, `updateQuantity`, `getItemQuantity`, and `totalPrice`.
- **[`FavoritesContext.tsx`](context/FavoritesContext.tsx)**: 
    - Simple toggle logic for liking products.
- **[`ProductDetailContext.tsx`](context/ProductDetailContext.tsx)**: 
    - Controls which product is currently showing in the **Product Modal**.
- **[`DrawerContext.tsx`](context/DrawerContext.tsx)**: 
    - Controls the open/closed state of the **Side Drawer**.

### 3. **UI Components (`/components`)**
Reusable UI blocks, organized by feature.

#### **Home Components** (`/components/home`)
- **[`HomeHeader.tsx`](components/home/HomeHeader.tsx)**: The top bar with the "Hamburger" menu icon and Search bar.
- **[`ProductGrid.tsx`](components/home/ProductGrid.tsx)**: The main grid displaying product cards.
- **[`PromoBanner.tsx`](components/home/PromoBanner.tsx)**: The horizontal scrollable banners (New Collection).

#### **Product & Modal** (`/components/product`)
- **[`ProductDetailModal.tsx`](components/product/ProductDetailModal.tsx)**: **(CRITICAL FILE)** 
    - This is the interactive sheet that pops up when you click a product.
    - **Animations**: Contains the logic for the **Spring Bounce** effect (`damping: 15`, `stiffness: 120`).
    - **Gestures**: Contains `PanResponder` logic for the "Drag Down to Dismiss" feature.
    - **Logic**: Contains the **Smart Add-to-Bag Button** (switches to `+ 1 -` if in bag).

#### **Side Drawer** (`/components/common`)
- **[`SideDrawer.tsx`](components/common/SideDrawer.tsx)**: 
    - A custom-built drawer (not the standard React Navigation one).
    - **Floating Design**: It sits 80px from top/bottom for a "card" look.
    - **Animation**: Slides in smoothly using `Animated.spring`.

#### **Bag** (`/components/bag`)
- **[`BagScreen.tsx`](components/bag/BagScreen.tsx)**: Displays the list of items in the cart and the checkout button.

### 4. **Data (`/data`)**
- **[`products.ts`](data/products.ts)**: The "Mock Database". All product info, images, and prices are stored here.

---

## 🌟 Key Features & Implementation Details

### 1. Springy Product Modal 🥎
When you tap a product, it doesn't just slide up; it **bounces**.
- **Code**: `components/product/ProductDetailModal.tsx`
- **Tech**: We use `Animated.spring` with low damping (`15`) to create a playful overshoot effect.

### 2. Smart Add-to-Bag Button 🛒
The button is intelligent.
- **State 1**: Item not in bag -> Shows generic "Add to Bag" button.
- **State 2**: Item in bag -> Morph into a **Quantity Controller** (`- 1 +`).
- **Code**: `components/product/ProductDetailModal.tsx` (UI) + `context/BagContext.tsx` (Logic).

### 3. Floating Side Drawer 🍔
A custom "Hamburger Menu" that looks like a floating sheet.
- **Code**: `components/common/SideDrawer.tsx`
- **Tech**: Uses a transparent Modal + Absolute Positioning. Wrapped in a `ScrollView` to ensure it works on small screens.

### 4. Gestures 👆
You can **drag** the Product Modal down to close it.
- **Code**: `components/product/ProductDetailModal.tsx` (`PanResponder`).

---

## 🏃‍♂️ How to Run

1.  **Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Start the App**:
    ```bash
    npx expo start --clear
    ```
3.  **Run on Device**:
    - Scan the QR code with your phone (Expo Go app).
    - Or press `a` for Android Emulator / `i` for iOS Simulator.

---

## 🛠️ Customization Guide

- **Change Colors**: Go to `tailwind.config.js`.
- **Add Products**: Edit `data/products.ts`.
- **Adjust Animation Bounce**: Go to `components/product/ProductDetailModal.tsx` and change `damping` (lower = bouncier).

---

*Built with ❤️ by your AI Agent.*

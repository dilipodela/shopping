# Hello Gorgeous - Shopping App

Welcome to the **Hello Gorgeous** mobile application! This is a modern e-commerce app built for iOS and Android using **React Native** (Expo).

This guide is written for new developers. It explains **how the app works**, **where everything is located**, and **how to run it**.

---

## 🚀 Quick Start

1.  **Install Dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

2.  **Run the App**:
    ```bash
    npx expo start
    ```
    - Scan the QR code with your phone (using Expo Go app).
    - Or press `a` to run on Android Emulator.
    - Or press `i` to run on iOS Simulator.

---

## 📂 Project Structure (Where things are)

Here is a map of the folders so you know where to look:

### 1. `app/` (The Screens)
This folder uses **Expo Router**. The files here correspond to screens in the app.
- **`(tabs)/`**: Contains the main bottom tab navigation screens:
    - `index.tsx` (Home Screen)
    - `search.tsx` (Search Screen)
    - `bag.tsx` (Shopping Bag Screen)
    - `favorites.tsx` (Favorites Screen)
    - `profile.tsx` (Profile Screen)
- **`_layout.tsx`**: The main setup file that wraps the entire app (Providers, Navigation settings).
- **`product-details.tsx`**: Individual screens that open separately.

### 2. `components/` ( The Building Blocks)
We break down screens into smaller, reusable pieces.
- **`common/`**: Things used everywhere (e.g., `SideDrawer.tsx` for the side menu, `OnboardingScreen.tsx`).
- **`home/`**: Components specifically for the Home screen (`PromoBanner`, `CategoryList`, `ProductGrid`).
- **`product/`**: Components for the product view (`ProductDetailModal`, `FullScreenImageViewer`).
- **`bag/`**: Components for the cart (`BottomBar`, `FloatingCartBar`).

### 3. `context/` (The Brains / State)
This is where we store data that needs to be accessed by many screens.
- **`BagContext.tsx`**: Remembers what items are in your cart.
- **`FavoritesContext.tsx`**: Remembers your liked items.
- **`UserActivityContext.tsx`**: Tracks recently viewed and shared items.
- **`ProductDetailContext.tsx`**: Controls the "Pop-up" product card.

### 4. `data/`
- **`products.ts`**: Contains the dummy data for products (names, prices, images).

---

## 🔄 Data Flow & Communication (How info moves)

Understanding **how data moves** is key to understanding this app. We don't just pass data from parent to child; we use **Context** heavily.

### 1. Global State (The "Context" API)
Imagine a "cloud" of data floating above the entire app. Any screen can access this data without needing it passed down.
- **Bag/Cart Data**: When you add an item to the bag in `ProductDetailModal`, the `BagContext` updates. The `BagScreen` automatically listens to this context and updates its list instantly.
    - *Flow*: `ProductModal` -> calls `addToBag()` -> `BagContext` updates -> `BagScreen` re-renders.
- **Favorites**: Similar to the Bag. Toggling a heart icon updates `FavoritesContext`.
- **Product Details**: Instead of navigating to a new page with a URL parameter, we often set the `selectedProduct` in `ProductDetailContext`. The global `ProductDetailModal` (living in the root layout) "sees" this change and slides up the modal.

### 2. Parent -> Child (Props)
For simple components, we pass data down directly.
- *Example*: `ProductGrid` passes a single `product` object to `ProductCard`. The card simply displays what it is given.

### 3. Screen-to-Screen (Navigation)
- **Expo Router**: We use file-based routing.
- **Passing Params**: For screens like `/shared-items`, we navigate using `router.push("/shared-items")`. If we needed to pass an ID, we would use `router.push("/product/123")` and read it with `useLocalSearchParams()`.

---

---

## ✨ Key Features

- **3D Digital Twin**: Create a lifelike 3D avatar from 2D photos.
- **Virtual Try-On**: Visualize outfits on your digital twin before buying.
- **Modern Onboarding**: Smooth introduction flow with slide animations.
- **Dynamic Home Screen**: Personalized greetings and "Dancing Script" typography.
- **Smart Cart & Favorites**: Real-time updates across screens.

---

## 🛠 Tech Stack

- **Framework**: React Native (via Expo)
- **Navigation**: Expo Router (File-based routing)
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Fonts**: Expo Google Fonts (Dancing Script)
- **Icons**: Ionicons

---

## 💡 Tips for New Developers

- **Adding a new Screen**: Create a new `.tsx` file in the `app/` folder. It becomes a page automatically!
- **Changing Colors**: Check `tailwind.config.js` or standard Tailwind classes.
- **Debugging**: If something breaks, check the terminal where `npx expo start` is running.

Happy Coding! 🚀

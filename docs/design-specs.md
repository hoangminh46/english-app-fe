# Design Specifications: AI Assistant "Mine"

## 🎨 Color Palette
| Name | Hex | Usage |
|------|-----|-------|
| Primary (Blue) | #3B82F6 | Header, User bubbles, FAB border |
| Primary Gradient | linear-gradient(to right, #3B82F6, #6366F1) | Header background |
| Success | #10B981 | Online status dot |
| Background (Glass) | rgba(255, 255, 255, 0.8) | Chat window background |
| Mine Bubble | #F3F4F6 | Assistant chat bubbles |
| Text Dark | #1F2937 | Primary text |
| Text Light | #FFFFFF | Text on blue background |

## 📝 Typography
| Element | Font | Size | Weight |
|---------|------|------|--------|
| Header Name | Inter/Outfit | 18px | 700 |
| Message Text | Inter/Outfit | 15px | 400 |
| Quick Action | Inter/Outfit | 14px | 600 |
| Status Text | Inter/Outfit | 12px | 500 |

## 📐 Spacing System
- **FAB Margin:** 24px (bottom & right)
- **Chat Window Width:** 380px (Desktop), 90vw (Mobile)
- **Chat Window Height:** 550px (Desktop), 70vh (Mobile)
- **Bubble Padding:** 12px 16px
- **Avatar Size (FAB):** 64x64px
- **Avatar Size (Message):** 32x32px

## 🔲 Border Radius
- **Chat Window:** 24px
- **Messages:** 18px (Custom: bottom-left 4px for Mine, bottom-right 4px for User)
- **Quick Actions:** 9999px (Pill shape)
- **FAB:** 50% (Circle)

## 🌫️ Shadows & Blur
- **Glassmorphism:** `backdrop-filter: blur(12px)`
- **FAB Shadow:** `0 10px 15px -3px rgba(59, 130, 246, 0.4)`
- **Window Shadow:** `0 20px 25px -5px rgba(0, 0, 0, 0.1)`

## ✨ Animations (Framer Motion)
- **Window Toggle:** 
  - `initial: { opacity: 0, scale: 0.5, y: 100, originX: 1, originY: 1 }`
  - `animate: { opacity: 1, scale: 1, y: 0 }`
  - `exit: { opacity: 0, scale: 0.5, y: 100 }`
  - `transition: { type: "spring", stiffness: 260, damping: 25 }`
- **Messages:** `initial: { opacity: 0, x: -10 }, animate: { opacity: 1, x: 0 }`

## 🖼️ Component Specs
- **FAB:** Circular button with `c:\Users\admin\Desktop\AmelaProject\IDP\english_app_fe\public\images\avatar.png` as background-image.
- **Typing Indicator:** 3 bouncing dots using `animate-bounce` with staggered delays.
- **Scroll Behavior:** Smooth scrolling with `scroll-behavior: smooth`.

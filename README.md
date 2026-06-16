# 🏰 Konquest Kitchen

**A Fantasy-Themed Culinary Quest Manager** - Transform your cooking adventures into an epic RPG journey!

Konquest Kitchen is an interactive web application that gamifies meal planning, recipe discovery, budget tracking, and ingredient management. Embark as a culinary adventurer with customizable fantasy companions, conquer recipe quests, and track your culinary triumphs.

---

## ✨ **Features**

### 🚪 **Tavern Authentication System**
- Secure email/password sign-in with account persistence
- Guest mode for immediate access without registration
- Session-based authentication with localStorage backup
- Sign-out button ("🐎 Heading Out") to return to entry gate

### 🔮 **Fantasy Companion Roster**
- 8 unique, stylized fantasy companions to choose from:
  - 🔮 Mystic Guide
  - ⚔️ Shadow Jackal
  - 🌿 Zen Monk
  - ✨ Light Weaver
  - 🛡️ Grand Paladin
  - 🏹 Roving Ranger
  - 🧪 Alchemist Imp
  - 🎼 Tavern Minstrel
- Custom portrait upload (camera/file picker)
- Dynamic HUD profile display with level, name, and title

### 📜 **Provisions Raid List** (Smart Shopping)
- Dual-input grocery management
- **"Raid Missing Ingredients"** button auto-scans recipe requirements
- Intelligent missing item detection from your pantry vault
- Automatic checklist population
- Minted Masterpieces gallery of conquered recipes

### 🏆 **First-Time Conquer Photo Locks**
- Victory modal on first recipe completion
- Photo capture/upload to commemorate your triumph
- Permanent recipe card image override
- Gallery scroll of all minted masterpieces with timestamps

### 🍳 **4 Culinary Modes**
- **Cook Mode**: Traditional recipes
- **Mixologist Mode**: Cocktail crafting
- **Café & Juicery**: Beverages & smoothies
- **Snack Vault**: Quick bites

### 🔍 **Advanced Recipe Discovery**
- Real-time search with multi-criteria filtering
- Filter by: Meat, Seafood, Vegetarian, Quick (<20 mins)
- Allergy shield (prevent unsafe recipes)
- Custom dietary filters
- Weather-based recipe recommendations
- Google web search integration for custom queries

### 💰 **Budget & Expense Tracking**
- Monthly budget management
- Receipt logging system
- Searchable currency selector (18+ global currencies)
- Spending analytics (current vs. previous month)
- AI-powered receipt scanning
- Money saved tracker

### 🗃️ **Inventory Management**
- Multi-zone inventory system (Pantry Vault, Freezer, etc.)
- Item categorization with custom tags
- Quick item addition and removal
- Freezer transfer tracking

### 🌍 **Multi-Language Support**
- Global language switcher
- Support for multiple languages
- Consistent translation across all UI elements

### 🌤️ **Smart Weather Integration**
- Geolocation-based weather fetching
- Weather-responsive recipe recommendations
- Manual weather override option

### 📊 **Player Statistics & Progression**
- Experience points (XP) tracking
- Recipes made counter
- Money saved tracker
- Waste reduction metric
- Quest streak counter
- Level-based progression system

### 🛠️ **Gear & Quest Flow**
- Equipment selection for recipes
- Custom gear addition
- Step-by-step quest progression
- Quest history log
- Reset quest functionality

---

## 🎮 **How to Play**

1. **Enter the Tavern**: Sign in with an account or enter as a guest
2. **Choose Your Companion**: Select from 8 fantasy companions and upload a custom portrait
3. **Select a Mode**: Pick a culinary mode (Cook, Mixologist, Café, or Snack)
4. **Browse Recipes**: Search and filter recipes based on your preferences
5. **Gather Provisions**: Use the Provisions Raid List to auto-populate missing ingredients
6. **Plan Your Quest**: View budget, inventory, and required equipment
7. **Execute the Recipe**: Follow steps and track progress
8. **Mint Your Masterpiece**: Upload a photo of your first-time conquest
9. **Track Your Legacy**: View statistics, minted photos, and quest history

---

## 🛠️ **Tech Stack**

- **Frontend**: React 18+ with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks (`useState`, `useEffect`, `useMemo`, `useCallback`)
- **Icons**: Lucide React
- **Localization**: Custom i18n Context
- **Storage**: Browser localStorage
- **Weather API**: wttr.in (geolocation-based)
- **Build Tool**: Vite (recommended)

---

## 📦 **Installation**

### Prerequisites
- Node.js 16+ and npm/yarn installed

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/ShinHui-EnLi/KonQuest-Kitchen.git
   cd KonQuest-Kitchen

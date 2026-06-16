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
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173 (or the URL shown in terminal)
   ```

---

## 🚀 **Deployment**

### **GitHub Pages** (Free)
```bash
npm run build
# Follow GitHub Pages setup in repository settings
# Live at: https://ShinHui-EnLi.github.io/KonQuest-Kitchen
```

### **Vercel** (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Import this repository
3. Click "Deploy"
4. Automatic deployments on every push

### **Netlify**
1. Go to [netlify.com](https://netlify.com)
2. Connect your GitHub repo
3. Auto-deploys configured

---

## 📁 **Project Structure**

```
KonQuest-Kitchen/
├── src/
│   ├── App.tsx              # Main app component with all integrations
│   ├── components/          # Reusable UI components
│   │   ├── LoginSection.tsx
│   │   ├── RecipeCard.tsx
│   │   ├── BudgetLedger.tsx
│   │   ├── InventoryVault.tsx
│   │   └── ...
│   ├── hooks/
│   │   └── useGameState.ts  # Game state management
│   ├── i18n/
│   │   └── LanguageContext.tsx  # Multi-language support
│   ├── types/               # TypeScript types
│   ├── data.ts              # Recipe & dietary data
│   └── index.css            # Tailwind directives
├── public/                  # Static assets
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🎨 **UI/UX Design**

- **Dark Bento Layout**: Modern dark theme with card-based grid system
- **Glass Morphism**: Frosted glass effect on cards with gradients
- **Color Scheme**: 
  - Cyan (`#06B6D4`): Primary actions & highlights
  - Emerald (`#10B981`): Success & positive actions
  - Amber (`#F59E0B`): Warnings & currencies
  - Fuchsia (`#EC4899`): Profile & authentication
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Tailwind CSS**: Utility-first styling approach

---

## 🔧 **Configuration**

### Currencies
Edit currency list in `src/App.tsx` under `CURRENCIES` object:
```typescript
const CURRENCIES: Record<string, { symbol: string; code: string; name: string }> = {
  USD: { symbol: '$', code: 'USD', name: 'US Dollar' },
  // Add more currencies...
};
```

### Companions
Customize companions in `COMPANIONS` array:
```typescript
const COMPANIONS = [
  { id: 'mystic', label: '🔮 Mystic Guide', seed: 'mystic' },
  // Modify or add companions...
];
```

### Recipes
Manage recipes in `src/data.ts`:
```typescript
export const recipes: Recipe[] = [
  // Add/edit recipes here
];
```

---

## 🌐 **Multi-Language Support**

The app supports multiple languages through the `LanguageContext`. Add new languages in:
- `src/i18n/LanguageContext.tsx`

Example translation keys:
```typescript
{
  header: { subtitle: "...", xp: "...", savings: "..." },
  auth: { tavernWelcome: "...", email: "...", password: "..." },
  filters: { oracle: "...", placeholder: "...", dietaryFilters: "..." },
  // ... more keys
}
```

---

## 💾 **Data Persistence**

- **Authentication**: Saved in localStorage as `tavernAuth`
- **Companion Portraits**: `companion_{companionId}`
- **Game State**: Browser state management (can be extended to backend)

---

## 🐛 **Troubleshooting**

### Weather not loading?
- Allow geolocation permissions in browser settings
- Check internet connection
- Weather API (wttr.in) may be temporarily unavailable

### Photos not saving?
- Ensure browser allows camera/file access
- Check localStorage is enabled
- Verify browser storage quota

### Styling looks wrong?
- Clear browser cache: `Ctrl+Shift+Delete` (or `Cmd+Shift+Delete` on Mac)
- Rebuild Tailwind: `npm run build`

---

## 📝 **License**

This project is open source. Feel free to fork, modify, and deploy!

---

## 🤝 **Contributing**

Want to add features or fix bugs?

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m "feat: add your feature"`
4. Push to branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📞 **Support**

For issues, questions, or feature requests:
- Open a [GitHub Issue](https://github.com/ShinHui-EnLi/KonQuest-Kitchen/issues)
- Check existing documentation
- Review the codebase comments

---

## 🎉 **Features Roadmap**

- [ ] Backend database integration (Firebase/Supabase)
- [ ] Multiplayer quest challenges
- [ ] Recipe rating & community sharing
- [ ] Advanced recipe recommendations (ML)
- [ ] Nutritional information display
- [ ] Meal planning calendar
- [ ] Social profiles & leaderboards
- [ ] Mobile app (React Native)

---

**Happy Cooking! May your culinary quests be legendary! 🏆🍳✨**

*Konquest Kitchen - Where Every Meal is an Adventure*

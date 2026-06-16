import { useState, useEffect, useMemo, useCallback } from 'react';
import { Sparkles, LogOut, Globe, Coins, Camera, Download } from 'lucide-react';
import { recipes, dietaryOptions } from './data';
import { useGameState } from './hooks/useGameState';
import { Recipe } from './types';
import { LanguageProvider, useTranslation } from './i18n/LanguageContext';

import { LoginSection } from './components/LoginSection';
import { StatsSection } from './components/StatsSection';
import { WeatherWidget } from './components/WeatherWidget';
import { AvatarSection } from './components/AvatarSection';
import { WardrobeSection } from './components/WardrobeSection';
import { GroceryChecklist } from './components/GroceryChecklist';
import { BudgetLedger } from './components/BudgetLedger';
import { InventoryVault } from './components/InventoryVault';
import { GlasswareSelector } from './components/GlasswareSelector';
import { QuestFlow } from './components/QuestFlow';
import { CelebrationModal } from './components/CelebrationModal';
import { RecipeCard } from './components/RecipeCard';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { KoFiSection } from './components/KoFiSection';
import { RecipePhotoCard } from './components/RecipePhotoCard';

const MODES = ['Cook Mode', 'Mixologist Mode', 'Café & Juicery', 'Snack Vault'];
const FILTERS = ['All', 'Meat', 'Seafood', 'Vegetarian', 'Quick (<20 mins)'];

const COMPANIONS = [
  { id: 'mystic', label: '🔮 Mystic Guide', seed: 'mystic' },
  { id: 'jackal', label: '⚔️ Shadow Jackal', seed: 'jackal' },
  { id: 'monk', label: '🌿 Zen Monk', seed: 'monk' },
  { id: 'weaver', label: '✨ Light Weaver', seed: 'weaver' },
  { id: 'paladin', label: '🛡️ Grand Paladin', seed: 'paladin' },
  { id: 'ranger', label: '🏹 Roving Ranger', seed: 'ranger' },
  { id: 'alchemist', label: '🧪 Alchemist Imp', seed: 'alchemist' },
  { id: 'minstrel', label: '🎼 Tavern Minstrel', seed: 'minstrel' },
];

const CURRENCIES: Record<string, { symbol: string; code: string; name: string }> = {
  USD: { symbol: '$', code: 'USD', name: 'US Dollar' },
  GBP: { symbol: '£', code: 'GBP', name: 'British Pound' },
  EUR: { symbol: '€', code: 'EUR', name: 'Euro' },
  JPY: { symbol: '¥', code: 'JPY', name: 'Japanese Yen' },
  CAD: { symbol: 'C$', code: 'CAD', name: 'Canadian Dollar' },
  AUD: { symbol: 'A$', code: 'AUD', name: 'Australian Dollar' },
  CHF: { symbol: 'CHF', code: 'CHF', name: 'Swiss Franc' },
  CNY: { symbol: '¥', code: 'CNY', name: 'Chinese Yuan' },
  SEK: { symbol: 'kr', code: 'SEK', name: 'Swedish Krona' },
  NZD: { symbol: 'NZ$', code: 'NZD', name: 'New Zealand Dollar' },
  KRW: { symbol: '₩', code: 'KRW', name: 'South Korean Won' },
  SGD: { symbol: 'S$', code: 'SGD', name: 'Singapore Dollar' },
  NOK: { symbol: 'kr', code: 'NOK', name: 'Norwegian Krone' },
  MXN: { symbol: 'Mex$', code: 'MXN', name: 'Mexican Peso' },
  INR: { symbol: '₹', code: 'INR', name: 'Indian Rupee' },
  BRL: { symbol: 'R$', code: 'BRL', name: 'Brazilian Real' },
  ZAR: { symbol: 'R', code: 'ZAR', name: 'South African Rand' },
  HKD: { symbol: 'HK$', code: 'HKD', name: 'Hong Kong Dollar' },
};

interface PhotoGalleryItem {
  recipeId: number;
  recipeName: string;
  photoUrl: string;
  timestamp: string;
}

function TavernEntryGate({
  onGuestEnter,
  onSignInSuccess,
}: {
  onGuestEnter: () => void;
  onSignInSuccess: () => void;
}) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [signInMode, setSignInMode] = useState<'choice' | 'form'>('choice');

  const handleSignIn = () => {
    if (email && password) {
      localStorage.setItem('tavernAuth', JSON.stringify({ email, password, timestamp: Date.now() }));
      onSignInSuccess();
    }
  };

  if (signInMode === 'choice') {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#111827_0%,_#09090b_45%,_#030712_100%)] flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-300 mb-2">Konquest Kitchen</p>
            <h1 className="font-display text-5xl text-white leading-tight font-serif mb-4">
              Welcome to the Tavern
            </h1>
            <p className="text-zinc-400 text-sm">{t.auth?.tavernWelcome || 'Choose your path to entry'}</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => setSignInMode('form')}
              className="w-full rounded-2xl border border-cyan-400/50 bg-cyan-400/10 px-6 py-4 text-lg font-semibold text-cyan-100 hover:bg-cyan-400/20 transition-all duration-200 shadow-lg hover:shadow-cyan-400/20"
            >
              🚪 Secure Tavern Entry
            </button>

            <button
              onClick={onGuestEnter}
              className="w-full rounded-2xl border border-amber-400/50 bg-amber-400/10 px-6 py-4 text-lg font-semibold text-amber-100 hover:bg-amber-400/20 transition-all duration-200 shadow-lg hover:shadow-amber-400/20"
            >
              🪵 Enter as Tavern Guest
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#111827_0%,_#09090b_45%,_#030712_100%)] flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <button
            onClick={() => setSignInMode('choice')}
            className="text-zinc-400 hover:text-zinc-300 mb-4 text-sm"
          >
            ← Back
          </button>
          <h2 className="font-display text-3xl text-white font-serif mb-2">
            {isSignUp ? 'Register' : 'Sign In'}
          </h2>
        </div>

        <div className="tile glass rounded-3xl p-6 border border-zinc-800/50 bg-gradient-to-br from-zinc-900/95 to-zinc-950/95 space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-[0.35em] text-cyan-300 mb-2">
              {t.auth?.email || 'Email'}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.auth?.emailPlaceholder || 'your@tavern.com'}
              className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/95 px-4 py-3 text-sm text-zinc-100 outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.35em] text-cyan-300 mb-2">
              {t.auth?.password || 'Password'}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/95 px-4 py-3 text-sm text-zinc-100 outline-none focus:border-cyan-400"
              onKeyDown={(e) => e.key === 'Enter' && handleSignIn()}
            />
          </div>

          <button
            onClick={handleSignIn}
            disabled={!email || !password}
            className="w-full rounded-2xl border border-emerald-400/50 bg-emerald-400/10 px-4 py-3 text-sm font-semibold text-emerald-100 hover:bg-emerald-400/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSignUp ? 'Create Account' : 'Enter Tavern'}
          </button>

          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="w-full text-xs text-zinc-400 hover:text-zinc-300"
          >
            {isSignUp ? 'Already have an account?' : 'Need an account?'}
          </button>
        </div>
      </div>
    </div>
  );
}

function CurrencySelector({
  currentCurrency,
  onCurrencyChange,
}: {
  currentCurrency: string;
  onCurrencyChange: (code: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCurrencies = useMemo(() => {
    const search = searchTerm.toLowerCase();
    return Object.entries(CURRENCIES).filter(
      ([code, data]) =>
        code.toLowerCase().includes(search) ||
        data.name.toLowerCase().includes(search) ||
        data.symbol.toLowerCase().includes(search)
    );
  }, [searchTerm]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-2xl border border-amber-400/40 bg-amber-400/10 px-3 py-2 text-sm font-semibold text-amber-100 hover:bg-amber-400/20 transition-colors"
      >
        <Coins className="w-4 h-4" />
        {currentCurrency}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-zinc-800 bg-zinc-950/95 p-4 shadow-2xl z-50 space-y-3">
          <div className="relative">
            <input
              type="text"
              placeholder="🔍 Search Currency..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/95 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-cyan-400"
            />
          </div>

          <div className="max-h-64 overflow-y-auto space-y-2">
            {filteredCurrencies.map(([code, data]) => (
              <button
                key={code}
                onClick={() => {
                  onCurrencyChange(code);
                  setIsOpen(false);
                  setSearchTerm('');
                }}
                className={`w-full text-left rounded-2xl border px-3 py-2 text-sm transition-colors ${
                  currentCurrency === code
                    ? 'border-emerald-400 bg-emerald-400/10 text-emerald-100'
                    : 'border-zinc-800 bg-zinc-900 text-zinc-200 hover:bg-zinc-800'
                }`}
              >
                <div className="font-semibold">{data.symbol} {code}</div>
                <div className="text-xs text-zinc-400">{data.name}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function CompanionRoster({
  selectedCompanion,
  onSelect,
  onPhotoUpload,
  customPortrait,
}: {
  selectedCompanion: string;
  onSelect: (id: string) => void;
  onPhotoUpload: (file: File) => void;
  customPortrait?: string;
}) {
  const fileInputRef = useCallback((input: HTMLInputElement | null) => {
    if (!input) return;
  }, []);

  const handlePhotoClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (file) onPhotoUpload(file);
    };
    input.click();
  };

  return (
    <div className="space-y-3">
      <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">Companion Roster</p>
      <div className="grid grid-cols-2 gap-2">
        {COMPANIONS.map((companion) => (
          <button
            key={companion.id}
            onClick={() => onSelect(companion.id)}
            className={`rounded-2xl border px-3 py-2 text-xs font-semibold transition-colors ${
              selectedCompanion === companion.id
                ? 'border-cyan-400 bg-cyan-400/12 text-cyan-100'
                : 'border-zinc-700 bg-zinc-900/80 text-zinc-200 hover:bg-zinc-800'
            }`}
          >
            {companion.label}
          </button>
        ))}
      </div>

      <div className="relative rounded-2xl border border-zinc-800 bg-zinc-950/90 p-4 group">
        <div className="w-full h-32 rounded-lg bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center overflow-hidden">
          {customPortrait ? (
            <img src={customPortrait} alt="Custom Portrait" className="w-full h-full object-cover" />
          ) : (
            <div className="text-3xl">
              {COMPANIONS.find((c) => c.id === selectedCompanion)?.label.split(' ')[0]}
            </div>
          )}
        </div>
        <button
          onClick={handlePhotoClick}
          className="absolute top-2 right-2 rounded-lg border border-cyan-400/50 bg-cyan-400/10 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Camera className="w-4 h-4 text-cyan-400" />
        </button>
      </div>
    </div>
  );
}

function ProvisionRaidList({
  selectedRecipe,
  inventory,
  shoppingChecklist,
  onAddMissingIngredients,
  photoGallery,
}: {
  selectedRecipe: Recipe | null;
  inventory: Array<{ id: string; name: string; zone: string }>;
  shoppingChecklist: string[];
  onAddMissingIngredients: (ingredients: string[]) => void;
  photoGallery: PhotoGalleryItem[];
}) {
  const { t } = useTranslation();

  const handleRaidIngredients = () => {
    if (!selectedRecipe) return;

    const pantryItems = new Set(
      inventory
        .filter((x) => x.zone === 'Pantry Vault')
        .map((x) => x.name.toLowerCase())
    );

    const missingIngredients = selectedRecipe.ingredients.filter(
      (ing) => !pantryItems.has(ing.toLowerCase())
    );

    onAddMissingIngredients(missingIngredients);
  };

  return (
    <div className="tile glass rounded-3xl p-5 md:p-6 border border-zinc-800/50 bg-gradient-to-br from-zinc-900/95 to-zinc-950/95 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.35em] text-emerald-300">
          {t.inventory?.provisionsRaid || 'Provisions Raid List'}
        </p>
        {selectedRecipe && (
          <button
            onClick={handleRaidIngredients}
            className="text-xs rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-emerald-100 hover:bg-emerald-400/20 transition-colors"
          >
            📜 Raid Missing Ingredients
          </button>
        )}
      </div>

      <div className="space-y-2">
        <p className="text-sm text-zinc-300">
          {shoppingChecklist.length} {t.inventory?.itemsNeeded || 'items needed'}
        </p>
        {shoppingChecklist.length > 0 ? (
          <div className="max-h-32 overflow-y-auto space-y-1">
            {shoppingChecklist.map((item, idx) => (
              <div key={idx} className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-xs text-zinc-200">
                • {item}
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-zinc-700 bg-zinc-950/90 px-3 py-2 text-xs text-zinc-400">
            {t.inventory?.emptyRaidList || 'No provisions needed'}
          </div>
        )}
      </div>

      {photoGallery.length > 0 && (
        <div className="border-t border-zinc-800 pt-4 space-y-3">
          <p className="text-xs uppercase tracking-[0.35em] text-amber-300">Minted Masterpieces</p>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {photoGallery.map((item, idx) => (
              <div
                key={idx}
                className="min-w-[100px] rounded-2xl border border-zinc-800 bg-zinc-950/95 overflow-hidden group"
              >
                <img
                  src={item.photoUrl}
                  alt={item.recipeName}
                  className="w-full h-20 object-cover group-hover:opacity-75 transition-opacity"
                />
                <div className="px-2 py-1 text-xs text-zinc-300 truncate">{item.recipeName}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ConquerPhotoModal({
  show,
  recipeName,
  onClose,
  onPhotoCapture,
}: {
  show: boolean;
  recipeName: string;
  onClose: () => void;
  onPhotoCapture: (file: File) => void;
}) {
  if (!show) return null;

  const handlePhotoSelect = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (file) {
        onPhotoCapture(file);
        onClose();
      }
    };
    input.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950/95 p-6 max-w-md w-full space-y-6 text-center">
        <div className="text-5xl">🏆</div>
        <div>
          <h3 className="font-display text-2xl text-white font-serif mb-2">
            MINT YOUR MASTERPIECE!
          </h3>
          <p className="text-sm text-zinc-300">
            You have successfully conquered <span className="font-semibold text-emerald-300">{recipeName}</span>. 
            Commemorate your triumph! Upload a portrait of your legendary creation to bind it forever as the 
            official cover of this scroll ledger.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={handlePhotoSelect}
            className="w-full rounded-2xl border border-amber-400/50 bg-amber-400/10 px-4 py-3 text-sm font-semibold text-amber-100 hover:bg-amber-400/20 transition-colors flex items-center justify-center gap-2"
          >
            <Camera className="w-4 h-4" />
            📷 Upload Portrait
          </button>
          <button
            onClick={onClose}
            className="w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm font-semibold text-zinc-100 hover:bg-zinc-800 transition-colors"
          >
            Skip for Now
          </button>
        </div>
      </div>
    </div>
  );
}

function AppContent() {
  const { t, formatCurrency, language, setLanguage } = useTranslation();

  const {
    state,
    setState,
    updateState,
    playerId,
    playerPassword,
    setPlayerPassword,
    handleSignIn,
    handleGuestMode,
    handleSignOut,
    addAllergy,
    toggleDietaryFilter,
    addItem,
    moveToFreezer,
    deleteTag,
    removeVaultItem,
    handleBudgetSave,
    nextQuestStep,
    resetQuest,
    addMissingIngredientsToChecklist,
    saveRecipePhoto,
  } = useGameState();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [partySizes, setPartySizes] = useState<Record<number, number>>({});
  const [selectedCompanion, setSelectedCompanion] = useState('mystic');
  const [customPortrait, setCustomPortrait] = useState<string>();
  const [customDietaryFilter, setCustomDietaryFilter] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [photoGallery, setPhotoGallery] = useState<PhotoGalleryItem[]>([]);
  const [showConquerModal, setShowConquerModal] = useState(false);
  const [conquerRecipeId, setConquerRecipeId] = useState<number | null>(null);
  const [firstTimeClears, setFirstTimeClears] = useState<Set<number>>(new Set());

  useEffect(() => {
    const auth = localStorage.getItem('tavernAuth');
    if (auth) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          try {
            const res = await fetch(
              `https://wttr.in/${pos.coords.latitude},${pos.coords.longitude}?format=j1`
            );
            const data = await res.json();
            const current = data.current_condition?.[0] || {};
            updateState('weather', {
              temp: current.temp_C,
              desc: current.weatherDesc?.[0]?.value || 'Sunny',
              icon: current.weatherCode,
            });
          } catch {
            updateState('weather', { temp: '24', desc: 'Cloudy', icon: '116' });
          }
        },
        () => updateState('weather', { temp: '23', desc: 'Clear', icon: '113' })
      );
    }
  }, [updateState]);

  const handleGuestEnter = () => {
    setIsAuthenticated(true);
    handleGuestMode();
  };

  const handleSignInSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('tavernAuth');
    handleSignOut();
  };

  const handlePhotoUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setCustomPortrait(e.target?.result as string);
      localStorage.setItem(
        `companion_${selectedCompanion}`,
        e.target?.result as string
      );
    };
    reader.readAsDataURL(file);
  };

  const handleCompanionSelect = (id: string) => {
    setSelectedCompanion(id);
    const savedPortrait = localStorage.getItem(`companion_${id}`);
    if (savedPortrait) {
      setCustomPortrait(savedPortrait);
    } else {
      setCustomPortrait(undefined);
    }
  };

  const handlePhotoCapture = (file: File, recipeId: number) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const photoUrl = e.target?.result as string;
      const selectedRecipe = recipes.find((r) => r.id === recipeId);
      
      setPhotoGallery((prev) => [
        ...prev,
        {
          recipeId,
          recipeName: selectedRecipe?.name || 'Unknown Recipe',
          photoUrl,
          timestamp: new Date().toLocaleString(),
        },
      ]);

      saveRecipePhoto(recipeId, photoUrl);
      setFirstTimeClears((prev) => new Set([...prev, recipeId]));
    };
    reader.readAsDataURL(file);
  };

  const handleConquerRecipe = (recipeId: number) => {
    if (!firstTimeClears.has(recipeId)) {
      setConquerRecipeId(recipeId);
      setShowConquerModal(true);
    }
  };

  const MODE_EMOJIS: Record<string, string> = {
    'Cook Mode': '🍳',
    'Mixologist Mode': '🍹',
    'Café & Juicery': '☕',
    'Snack Vault': '🥨',
  };

  const FILTER_EMOJIS: Record<string, string> = {
    All: '🟢',
    Meat: '🥩',
    Seafood: '🐟',
    Vegetarian: '🌿',
    'Quick (<20 mins)': '⏱️',
  };

  const getModeLabel = (mode: string) => {
    const modeKey = mode.toLowerCase().replace(/[^a-z]/g, '') as keyof typeof t.modes;
    return t.modes[modeKey] || mode;
  };

  const getFilterLabel = (filter: string) => {
    const filterKey = filter.toLowerCase().replace(/[^a-z]/g, '') as keyof typeof t.filters;
    return t.filters[filterKey] || filter;
  };

  const visibleRecipes = useMemo(() => {
    const normalized = state.query.trim().toLowerCase();
    let data = recipes.filter(
      (r) =>
        (state.mode === 'All' || r.mode === state.mode) &&
        (state.filter === 'All' ||
          (state.filter === 'Quick (<20 mins)'
            ? r.duration < 20
            : r.tags.includes(state.filter.replace('Quick (<20 mins)', 'Quick'))))
    );

    if (normalized) {
      data = data.filter((r) =>
        [r.name, r.country, r.description, r.mode, ...r.tags].join(' ').toLowerCase().includes(normalized)
      );
    }

    const allergySet = new Set(state.allergies.map((a) => a.toLowerCase()));
    data = data.filter((r) => !r.allergens.some((a) => allergySet.has(a.toLowerCase())));

    if (state.dietaryFilters.length) {
      data = data.filter((r) => state.dietaryFilters.every((tag) => (r.dietary || []).includes(tag)));
    }

    if (state.weather?.desc) {
      const weatherBoost = state.weather.desc.toLowerCase();
      if (weatherBoost.includes('rain') || weatherBoost.includes('cloud')) {
        data = [...data].sort((a, b) => a.duration - b.duration);
      }
      if (weatherBoost.includes('sun') || weatherBoost.includes('clear')) {
        data = [...data].sort((a, b) => b.duration - a.duration);
      }
    }

    return data;
  }, [state.mode, state.filter, state.query, state.weather, state.allergies, state.dietaryFilters]);

  const selectedRecipe = useMemo(
    () => recipes.find((r) => r.id === state.selectedRecipeId) || null,
    [state.selectedRecipeId]
  );

  const handleRecipeSelect = useCallback((recipe: Recipe) => {
    updateState('mode', recipe.mode);
    updateState('selectedRecipeId', recipe.id);
  }, [updateState]);

  const handlePartySizeChange = useCallback((recipeId: number, size: number) => {
    setPartySizes((prev) => ({ ...prev, [recipeId]: size }));
  }, []);

  const toggleGear = useCallback((item: string) => {
    setState((prev) => ({
      ...prev,
      gear: prev.gear.includes(item) ? prev.gear.filter((x) => x !== item) : [...prev.gear, item],
    }));
  }, [setState]);

  const addCustomGear = useCallback((item: string) => {
    setState((prev) => ({
      ...prev,
      gear: prev.gear.includes(item) ? prev.gear : [...prev.gear, item],
    }));
  }, [setState]);

  const addCustomDietaryFilter = useCallback(() => {
    const value = customDietaryFilter.trim();
    if (!value) return;
    toggleDietaryFilter(value);
    setCustomDietaryFilter('');
  }, [customDietaryFilter, toggleDietaryFilter]);

  const handleReceiptScan = async () => {
    updateState('scanStatus', t.budget.scanAI + '...');
    await new Promise((resolve) => setTimeout(resolve, 500));
    updateState('scanStatus', t.budget.scanStatus);
  };

  const resetMonth = () => {
    updateState('budget', state.monthlyBudget);
    updateState('receipts', []);
  };

  const handleCompletePhoto = useCallback((recipeId: number, photoUrl: string) => {
    saveRecipePhoto(recipeId, photoUrl);
    handleConquerRecipe(recipeId);
  }, [saveRecipePhoto]);

  const sessionLabel =
    playerId === 'guest'
      ? t.auth?.guestMode || 'Guest mode'
      : state.playerEmail || t.auth?.guestMode || 'Guest mode';

  if (!isAuthenticated) {
    return (
      <LanguageProvider>
        <TavernEntryGate
          onGuestEnter={handleGuestEnter}
          onSignInSuccess={handleSignInSuccess}
        />
      </LanguageProvider>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#111827_0%,_#09090b_45%,_#030712_100%)] p-4 md:p-6 text-zinc-100">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">Konquest Kitchen</p>
            <h1 className="font-display text-5xl md:text-6xl text-white leading-tight font-serif">Konquest Kitchen</h1>
          </div>
          <div className="flex items-center gap-3">
            <CurrencySelector currentCurrency={currency} onCurrencyChange={setCurrency} />
            <LanguageSwitcher />
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 rounded-2xl border border-fuchsia-400/40 bg-fuchsia-400/10 px-3 py-2 text-sm font-semibold text-fuchsia-100 hover:bg-fuchsia-400/20 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              🐎 Heading Out
            </button>
          </div>
        </div>

        <p className="text-zinc-300 max-w-2xl">{t.header.subtitle}</p>

        <div className="flex flex-wrap gap-3 text-sm text-zinc-200">
          <span className="rounded-full border border-fuchsia-400/40 bg-fuchsia-400/10 px-3 py-2">{sessionLabel}</span>
          <span className="rounded-full border border-cyan-500/40 bg-cyan-400/10 px-3 py-2">{t.header.xp} {state.xp}</span>
          <span className="rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-2">
            {t.header.savings} {formatCurrency(state.totalSaved)} {CURRENCIES[currency].symbol}
          </span>
          <span className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-2">
            {t.header.streak} 0 {t.header.days}
          </span>
        </div>

        <main className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <section className="xl:col-span-7 space-y-6">
            <div className="tile glass rounded-3xl p-5 md:p-6 space-y-5 border border-zinc-800/50 bg-gradient-to-br from-zinc-900/95 to-zinc-950/95">
              <div className="flex flex-wrap items-center gap-3">
                {MODES.map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      updateState('mode', item);
                      updateState('filter', 'All');
                    }}
                    className={`chip rounded-2xl border px-4 py-3 text-sm font-semibold transition-colors ${
                      state.mode === item
                        ? 'border-cyan-400 bg-cyan-400/12 text-cyan-100 shadow-[0_0_0_1px_rgba(45,212,191,0.18),0_18px_40px_rgba(8,145,178,0.18)]'
                        : 'border-zinc-700 bg-zinc-900/80 text-zinc-200 hover:bg-zinc-800'
                    }`}
                  >
                    {MODE_EMOJIS[item]} {getModeLabel(item)}
                  </button>
                ))}
              </div>

              <div className="rounded-3xl border border-zinc-800 bg-zinc-950/90 p-4 md:p-5">
                <div className="flex items-center gap-2 text-cyan-200 text-sm uppercase tracking-[0.35em]">
                  <Sparkles className="w-4 h-4" /> {t.filters.oracle}
                </div>
                <input
                  value={state.query}
                  onChange={(e) => updateState('query', e.target.value)}
                  placeholder={t.filters.placeholder}
                  className="mt-3 w-full rounded-2xl border border-zinc-800 bg-zinc-900/95 px-4 py-3 text-sm text-zinc-100 outline-none ring-0 focus:border-cyan-400"
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  {FILTERS.map((item) => (
                    <button
                      key={item}
                      onClick={() => updateState('filter', item)}
                      className={`chip rounded-full border px-3 py-2 text-xs font-semibold transition-colors ${
                        state.filter === item
                          ? 'border-emerald-400 bg-emerald-400/10 text-emerald-100'
                          : 'border-zinc-800 bg-zinc-900 text-zinc-200 hover:bg-zinc-800'
                      }`}
                    >
                      {FILTER_EMOJIS[item] || '🟢'} {item === 'Quick (<20 mins)' ? t.filters.quick : getFilterLabel(item)}
                    </button>
                  ))}
                </div>

                <div className="mt-3 rounded-3xl border border-zinc-800 bg-zinc-950/90 p-4">
                  <p className="text-xs uppercase tracking-[0.35em] text-emerald-300">{t.filters.dietaryFilters}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {dietaryOptions.map((item) => (
                      <button
                        key={item}
                        onClick={() => toggleDietaryFilter(item)}
                        className={`rounded-full border px-3 py-2 text-xs transition-colors ${
                          state.dietaryFilters.includes(item)
                            ? 'border-emerald-400 bg-emerald-400/10 text-emerald-100'
                            : 'border-zinc-800 bg-zinc-900 text-zinc-200 hover:bg-zinc-800'
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <input
                      value={customDietaryFilter}
                      onChange={(e) => setCustomDietaryFilter(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addCustomDietaryFilter()}
                      placeholder={t.filters.addOwnFilter}
                      className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/95 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-cyan-400"
                    />
                    <button
                      onClick={addCustomDietaryFilter}
                      className="rounded-2xl border border-emerald-400/40 bg-emerald-400/10 px-3 py-2 text-xs font-semibold text-emerald-100 hover:bg-emerald-400/20 transition-colors"
                    >
                      {t.avatar.add}
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-zinc-400">{t.filters.dietaryNote}</p>
                </div>

                {state.query.trim() && !recipes.find((r) => r.name.toLowerCase() === state.query.trim().toLowerCase()) && (
                  <button
                    onClick={() =>
                      window.open(
                        `https://www.google.com/search?q=${encodeURIComponent(
                          'recipe ' + state.query + ' -peanut -gluten -dairy -seafood'
                        )}`,
                        '_blank'
                      )
                    }
                    className="mt-4 rounded-2xl border border-fuchsia-400/40 bg-fuchsia-400/10 px-4 py-3 text-sm font-semibold text-fuchsia-100 hover:bg-fuchsia-400/20 transition-colors"
                  >
                    {t.filters.raidTheWeb}
                  </button>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
                <WeatherWidget
                  weather={state.weather}
                  manualWeather={state.manualWeather}
                  onManualWeatherChange={(w) => updateState('manualWeather', w)}
                  onToggleManual={() => updateState('manualWeather', state.manualWeather ? '' : 'Sunny')}
                />

                <article className="tile glass rounded-3xl p-5 md:p-6 border border-zinc-800/50 bg-gradient-to-br from-zinc-900/95 to-zinc-950/95">
                  <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">{t.quest.status}</p>
                  <h3 className="font-display text-2xl text-white font-serif">{t.quest.currentPath}</h3>
                  <div className="mt-4 space-y-3 text-sm text-zinc-200">
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/90 p-3">
                      {t.quest.activeMode}: {state.mode}
                    </div>
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/90 p-3">
                      {t.quest.allergyShield}: {state.allergies.length ? state.allergies.join(', ') : t.quest.clear}
                    </div>
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/90 p-3">
                      {t.quest.pantryWatch}: {state.inventory.filter((x) => x.zone === 'Pantry Vault').length} {t.quest.itemsSaved}
                    </div>
                  </div>
                </article>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {visibleRecipes.map((recipe) => (
                  <div key={recipe.id} className="space-y-3">
                    <RecipeCard
                      recipe={recipe}
                      onSelect={handleRecipeSelect}
                      partySize={partySizes[recipe.id] || 1}
                      onPartySizeChange={(size) => handlePartySizeChange(recipe.id, size)}
                      completedPhoto={state.recipePhotos[recipe.id]}
                    />
                    {state.selectedRecipeId === recipe.id && (
                      <RecipePhotoCard
                        recipe={recipe}
                        onCompletePhoto={(photoUrl) => {
                          handleCompletePhoto(recipe.id, photoUrl);
                          handleConquerRecipe(recipe.id);
                        }}
                        completedPhoto={state.recipePhotos[recipe.id]}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <aside className="xl:col-span-5 space-y-6">
            <div className="tile glass rounded-3xl p-5 md:p-6 border border-zinc-800/50 bg-gradient-to-br from-zinc-900/95 to-zinc-950/95">
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-300 mb-4">
                {t.avatar?.profile || 'Profile'}
              </p>
              
              <CompanionRoster
                selectedCompanion={selectedCompanion}
                onSelect={handleCompanionSelect}
                onPhotoUpload={handlePhotoUpload}
                customPortrait={customPortrait}
              />

              <div className="mt-4 space-y-2 text-sm">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950/90 p-3 text-cyan-300 font-semibold">
                  Lv. {state.xp} Savory Alchemist
                </div>
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950/90 p-3">
                  <span className="text-xs text-zinc-400">{t.avatar?.name || 'Name'}:</span>
                  <p className="text-zinc-100 font-semibold">{state.avatarName}</p>
                </div>
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950/90 p-3">
                  <span className="text-xs text-zinc-400">{t.avatar?.title || 'Title'}:</span>
                  <p className="text-zinc-100 font-semibold">
                    {COMPANIONS.find((c) => c.id === selectedCompanion)?.label.split(' ').slice(1).join(' ')}
                  </p>
                </div>
              </div>
            </div>

            <WardrobeSection xp={state.xp} />

            <KoFiSection />

            <ProvisionRaidList
              selectedRecipe={selectedRecipe}
              inventory={state.inventory}
              shoppingChecklist={state.shoppingChecklist}
              onAddMissingIngredients={addMissingIngredientsToChecklist}
              photoGallery={photoGallery}
            />

            <BudgetLedger
              monthlyBudget={state.monthlyBudget}
              budget={state.budget}
              receipts={state.receipts}
              currentMonthSpend={state.currentMonthSpend}
              previousMonthSpend={state.previousMonthSpend}
              scanStatus={state.scanStatus}
              onSave={handleBudgetSave}
              onScan={handleReceiptScan}
              onSetBudget={(b) => {
                updateState('monthlyBudget', b);
                updateState('budget', b);
              }}
              onResetMonth={resetMonth}
            />

            <InventoryVault
              inventory={state.inventory}
              zone={state.zone}
              onZoneChange={(z) => updateState('zone', z)}
              onAddItem={addItem}
              onMoveToFreezer={moveToFreezer}
              onDeleteTag={deleteTag}
              onRemoveItem={removeVaultItem}
            />

            <GlasswareSelector
              selectedGlass={state.selectedGlass}
              onGlassChange={(g) => updateState('selectedGlass', g)}
            />
          </aside>
        </main>

        <QuestFlow
          questStep={state.questStep}
          gear={state.gear}
          onNextStep={nextQuestStep}
          onToggleGear={toggleGear}
          onAddCustomGear={addCustomGear}
        />

        <section className="tile glass rounded-3xl p-5 md:p-6 border border-zinc-800/50 bg-gradient-to-br from-zinc-900/95 to-zinc-950/95">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">{t.history.title}</p>
              <h3 className="font-display text-2xl text-white font-serif">{t.history.claimed}</h3>
            </div>
            <button
              onClick={resetQuest}
              className="rounded-2xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs text-zinc-100 hover:bg-zinc-800 transition-colors"
            >
              {t.history.resetQuest}
            </button>
          </div>
          <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
            {state.questLog.length ? (
              state.questLog.map((item) => (
                <article
                  key={item.id}
                  className="min-w-[220px] rounded-3xl border border-zinc-800 bg-zinc-950/95 p-4 text-sm text-zinc-100"
                >
                  <p className="text-xs uppercase tracking-[0.35em] text-amber-300">{item.date}</p>
                  <p className="mt-2 font-semibold">{item.title}</p>
                  <p className="mt-2 text-zinc-300">{t.history.cardSaved}</p>
                </article>
              ))
            ) : (
              <article className="rounded-3xl border border-dashed border-zinc-700 bg-zinc-950/95 p-5 text-zinc-400">
                {t.history.noQuests}
              </article>
            )}
          </div>
        </section>
      </div>

      <ConquerPhotoModal
        show={showConquerModal}
        recipeName={recipes.find((r) => r.id === conquerRecipeId)?.name || 'Recipe'}
        onClose={() => setShowConquerModal(false)}
        onPhotoCapture={(file) => {
          if (conquerRecipeId) {
            handlePhotoCapture(file, conquerRecipeId);
          }
        }}
      />

      <CelebrationModal show={state.celebrate} onClose={resetQuest} />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;

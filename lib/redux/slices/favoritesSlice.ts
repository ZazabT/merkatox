import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '@/types/product';

interface FavoritesState {
  items: Product[];
}

const initialState: FavoritesState = {
  items: [],
};

// Load favorites from localStorage (client-side only)
const loadFavoritesFromStorage = (): Product[] => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading favorites from localStorage:', error);
    return [];
  }
};

// Save favorites to localStorage
const saveFavoritesToStorage = (favorites: Product[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites to localStorage:', error);
  }
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    // Initialize favorites from localStorage
    initializeFavorites: (state) => {
      state.items = loadFavoritesFromStorage();
    },
    // Add product to favorites
    addFavorite: (state, action: PayloadAction<Product>) => {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        saveFavoritesToStorage(state.items);
      }
    },
    // Remove product from favorites
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveFavoritesToStorage(state.items);
    },
    // Toggle favorite status
    toggleFavorite: (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.items.splice(index, 1);
      } else {
        state.items.push(action.payload);
      }
      saveFavoritesToStorage(state.items);
    },
    // Clear all favorites
    clearFavorites: (state) => {
      state.items = [];
      saveFavoritesToStorage([]);
    },
  },
});

export const {
  initializeFavorites,
  addFavorite,
  removeFavorite,
  toggleFavorite,
  clearFavorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;

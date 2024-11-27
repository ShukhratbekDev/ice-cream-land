import { create } from 'zustand';
import { selectRegionsSchema } from '@/db/schema';

interface BasicStore {
  isCartSidebarOpen: boolean;
  setCartSidebarState: (state: boolean) => void;

  isLikesSidebarOpen: boolean;
  setLikesSidebarState: (state: boolean) => void;

  selectedRegion: selectRegionsSchema | undefined;
  setSelectedRegion: (region: selectRegionsSchema | undefined) => void;
}

const useBasicStore = create<BasicStore>((set) => ({
  isCartSidebarOpen: false,
  setCartSidebarState: (state) => set({ isCartSidebarOpen: state }),

  isLikesSidebarOpen: false,
  setLikesSidebarState: (state) => set({ isLikesSidebarOpen: state }),

  selectedRegion: undefined,
  setSelectedRegion: (selectedRegion) => set({ selectedRegion }),
}));

export default useBasicStore;

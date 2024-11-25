import { create } from 'zustand';
import { selectRegionsSchema } from '@/db/schema';

interface BasicStore {
  isCartModalOpen: boolean;
  setCartSidebarState: (state: boolean) => void;

  isLikesSidebarOpen: boolean;
  setLikesSidebarState: (state: boolean) => void;

  selectedRegion: selectRegionsSchema | undefined;
  setSelectedRegion: (region: selectRegionsSchema | undefined) => void;
}

const useBasicStore = create<BasicStore>((set, get) => ({
  isCartModalOpen: false,
  setCartSidebarState: (state) => set({ isCartModalOpen: state }),

  isLikesSidebarOpen: false,
  setLikesSidebarState: (state) => set({ isLikesSidebarOpen: state }),

  selectedRegion: undefined,
  setSelectedRegion: (selectedRegion) => set({ selectedRegion }),
}));

export default useBasicStore;

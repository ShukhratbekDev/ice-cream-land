import { create } from 'zustand';
import { selectRegionsSchema } from '@/db/schema';

interface BasicStore {
  isCartModalOpen: boolean;
  setCartSidebarState: (state: boolean) => void;

  likes: Array<number>;
  getLike: (id: number) => boolean;
  addLike: (id: number) => void;
  removeLike: (id: number) => void;
  isLikesSidebarOpen: boolean;
  setLikesSidebarState: (state: boolean) => void;

  selectedRegion: selectRegionsSchema | undefined;
  setSelectedRegion: (region: selectRegionsSchema | undefined) => void;
}

const useBasicStore = create<BasicStore>((set, get) => ({
  isCartModalOpen: false,
  setCartSidebarState: (state) => set({ isCartModalOpen: state }),

  likes: [],
  getLike: (id) => {
    const { likes } = get();
    return likes.includes(id);
  },
  addLike: (id) => set((state) => ({ likes: [...state.likes, id] })),
  removeLike: (id) =>
    set((state) => ({
      likes: state.likes.filter((likeId) => likeId !== id),
    })),
  isLikesSidebarOpen: false,
  setLikesSidebarState: (state) => set({ isLikesSidebarOpen: state }),

  selectedRegion: undefined,
  setSelectedRegion: (selectedRegion) => set({ selectedRegion }),
}));

export default useBasicStore;

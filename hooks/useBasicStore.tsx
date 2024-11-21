import { create } from 'zustand';
import { Region } from '@/utils/api-requests';

interface BasicStore {
  isCartModalOpen: boolean;
  setCartModalState: (state: boolean) => void;
  likes: Array<string>;
  getLike: (id: string) => boolean;
  addLike: (id: string) => void;
  removeLike: (id: string) => void;
  selectedRegion: Region | undefined;
  setSelectedRegion: (region: Region | undefined) => void;
}

const useBasicStore = create<BasicStore>((set, get) => ({
  isCartModalOpen: false,
  setCartModalState: (state) => set({ isCartModalOpen: state }),
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
  selectedRegion: undefined,
  setSelectedRegion: (selectedRegion) => set({ selectedRegion }),
}));

export default useBasicStore;

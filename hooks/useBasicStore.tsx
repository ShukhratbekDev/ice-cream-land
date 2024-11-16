import { create } from 'zustand';

interface BasicStore {
  isCartModalOpen: boolean;
  setCartModalState: (state: boolean) => void;
  likes: Array<string>;
  getLike: (id: string) => boolean;
  addLike: (id: string) => void;
  removeLike: (id: string) => void;
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
}));

export default useBasicStore;

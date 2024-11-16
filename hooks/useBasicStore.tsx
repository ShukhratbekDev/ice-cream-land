import { create } from 'zustand';

interface BasicStore {
  isCartModalOpen: boolean;
  setCartModalState: (state: boolean) => void;
}

const useBasicStore = create<BasicStore>((set) => ({
  isCartModalOpen: false,
  setCartModalState: (state) => set({ isCartModalOpen: state }),
}));

export default useBasicStore;

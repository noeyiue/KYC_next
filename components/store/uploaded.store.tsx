import { create } from "zustand";

export interface FileStoreState {
  image: File | null;
  isLoading: boolean;
  isFetching: boolean;
  addImage: (file: File | null) => void;
  setLoading: (logic: boolean) => void;
  setFetching: (logic: boolean) => void;
}

export const useFileStore = create<FileStoreState>((set) => ({
  image: null,
  isLoading: false,
  isFetching: false,
  addImage: (file: File | null) => set({ image: file }),
  setLoading: (logic: boolean) => set({ isLoading: logic }),
  setFetching: (logic: boolean) => set({ isFetching: logic }),
}));

export interface ErrorStoreState {
    isError: boolean;
    setError: (logic: boolean) => void
}

export const useErrorStore = create<ErrorStoreState>((set) => ({
    isError: false,
    setError: (logic: boolean) => set({isError: logic}),
}))

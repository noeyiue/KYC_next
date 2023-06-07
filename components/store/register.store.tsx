import { create } from "zustand";

export interface RegisterFormData {
    username: string;
    th_firstname: string;
    th_lastname: string;
    en_firstname: string;
    en_lastname: string;
    id_num: string;
    email: string;
    phone: string;
    password: string;
    cpassword: string;
  }

export interface ErrorLoginState {
    isError: boolean;
    setError: (logic: boolean) => void
}

export const useErrorStore = create<ErrorLoginState>((set) => ({
    isError: false,
    setError: (logic: boolean) => set({isError: logic}),
}))
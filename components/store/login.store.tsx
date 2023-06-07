import { create } from "zustand";

export interface LoginFormData {
    username: string;
    password: string;
}


export interface sessionState {
    session: boolean;
    setSession: (logic: boolean) => void
}

export const useSessionStore = create<sessionState>((set) => ({
    session: false,
    setSession: (logic: boolean) => set({session: logic}),
}))
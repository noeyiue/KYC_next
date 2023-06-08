import { create } from "zustand";

export interface Step1FormData {
    th_fname: string,
    th_lname: string,
    en_fname: string,
    en_lname: string,
    id_num: string,
}

export interface FrontFormData {
    file: File | null,
    th_fname: string,
    th_lname: string,
    en_fname: string,
    en_lname: string,
    id_num: string,
    setData: (form: Step1FormData) => void
}

export const useFrontFormDataStore = create<FrontFormData>((set) => ({
    file: null,
    th_fname: "",
    th_lname: "",
    en_fname: "",
    en_lname: "",
    id_num: "",
    setData: (form: Step1FormData) => set({th_fname: form.th_fname, th_lname: form.th_fname, en_fname: form.en_fname, en_lname: form.en_lname}),
}))

export interface AllFileData {
    step1_img: File | null,
    step2_img: File | null,
    step3_img: File | null,
    addFileByStep: (step: string, file: File) => void,
}


export const useAllFileDataStore = create<AllFileData>((set) => ({
    step1_img: null,
    step2_img: null,
    step3_img: null,
    addFileByStep: (step: string, file: File) => set((state) => ({ ...state, [step]: file })),
  }));


export interface StatusData {
    step1: boolean,
    step2: boolean | null,
    step3: boolean | null,
    step4: boolean | null,
    setStep: (step: string, logic: boolean) => void,
}

// true : Now step, false : Nothing to do, null : have to do
export const useStatusDataStore = create<StatusData>((set) => ({
    step1: true,
    step2: null,
    step3: null,
    step4: null,
    setStep: (step: string, logic: boolean) =>
      set((state) => ({ ...state, [step]: logic })),
  }));
  
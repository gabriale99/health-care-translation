import { create } from "zustand";

interface TranslateStore {
  translations: { input: string; translation: string; target: string }[];
  updateInput: (id: number, newInput: string) => void;
  updateTranslation: (id: number, newInput: string) => void;
  updateTarget: (id: number, newInput: string) => void;
}

const useTranslateStore = create<TranslateStore>((set) => ({
  translations: [
    {
      input: "",
      translation: "",
      target: "Traditional Chinese",
    },
  ],
  updateInput: (id, newInput) =>
    set((state) => {
      state.translations[id].input = newInput;
      return { ...state };
    }),
  updateTranslation: (id, newInput) =>
    set((state) => {
      console.log(newInput);
      state.translations[id].translation = newInput;
      return { ...state };
    }),
  updateTarget: (id, newInput) =>
    set((state) => {
      state.translations[id].target = newInput;
      return { ...state };
    }),
}));

export default useTranslateStore;

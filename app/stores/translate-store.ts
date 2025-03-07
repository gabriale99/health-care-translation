import { create } from "zustand";

interface TranslateStore {
  input: string;
  translation: string;
  source: string;
  target: string;
  updateInput: (newInput: string) => void;
  updateTranslation: (newInput: string) => void;
  updateSource: (newInput: string) => void;
  updateTarget: (newInput: string) => void;
}

const useTranslateStore = create<TranslateStore>((set) => ({
  input: "",
  translation: "",
  source: "en",
  target: "zh-TW",
  updateInput: (newInput) => set((state) => ({ ...state, input: newInput })),
  updateTranslation: (newInput) =>
    set((state) => ({ ...state, translation: newInput })),
  updateSource: (newInput) => set((state) => ({ ...state, source: newInput })),
  updateTarget: (newInput) => set((state) => ({ ...state, target: newInput })),
}));

export default useTranslateStore;

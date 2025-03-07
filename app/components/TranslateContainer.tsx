"use client";
import useTranslateStore from "../stores/translate-store";
import LanguageSelector from "./LanguageSelector";
import TextArea from "./TextArea";

const TranslateContainer = () => {
  const { translation, target, updateTarget } = useTranslateStore();

  return (
    <div className="container grow flex flex-col gap-3">
      <LanguageSelector lang={target} setLang={updateTarget} />
      <TextArea input={translation} disabled={true} />
    </div>
  );
};

export default TranslateContainer;

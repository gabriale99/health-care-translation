import React from "react";
import TextArea from "./TextArea";
import LanguageSelector from "./LanguageSelector";
import useTranslateStore from "../stores/translate-store";

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

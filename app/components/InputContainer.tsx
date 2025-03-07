"use client";
import { useEffect } from "react";
import useTranslateStore from "../stores/translate-store";
import LanguageSelector from "./LanguageSelector";
import TextArea from "./TextArea";
// import TextToSpeechButton from "./TextToSpeechButton";

interface TranslateRespose {
  data: {
    translations: { translatedText: string; detectedSourceLanguage: string }[];
  };
}

const InputContainer = () => {
  const {
    input,
    source,
    target,
    updateInput,
    updateTranslation,
    updateSource,
  } = useTranslateStore();

  useEffect(() => {
    if (input) {
      fetch(`/api/translate`, {
        method: "POST",
        body: JSON.stringify({ q: input, target }),
      })
        .then((res) => res.json())
        .then((json) => {
          updateTranslation(
            (json as TranslateRespose).data.translations[0].translatedText
          );
        });
    }
  }, [input, updateTranslation, target]);

  return (
    <div className="container grow flex flex-col gap-3">
      <LanguageSelector lang={source} setLang={updateSource} />
      <TextArea input={input} onChange={updateInput} disabled={false} />
      {/* <TextToSpeechButton input={input} /> */}
    </div>
  );
};

export default InputContainer;

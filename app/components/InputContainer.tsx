import { useEffect } from "react";
import LanguageSelector from "./LanguageSelector";
import TextArea from "./TextArea";
import useTranslateStore from "../stores/translate-store";
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
      fetch(
        `https://translation.googleapis.com/language/translate/v2?key=${process
          .env.NEXT_PUBLIC_API_KEY!}&q=${input}&target=${target}`,
        {
          method: "POST",
        }
      )
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

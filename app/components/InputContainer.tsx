"use client";
import useTranslateStore from "../stores/translate-store";
import InputInterface from "./InputInterface";
// import TextToSpeechButton from "./TextToSpeechButton";

const InputContainer = () => {
  const { translations } = useTranslateStore();
  return (
    <div className="flex flex-col gap-2 h-full w-full">
      {translations.map((_, i) => (
        <InputInterface key={i} id={i} />
      ))}
    </div>
  );
};

export default InputContainer;

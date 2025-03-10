import React, { Suspense } from "react";
import useTranslateStore from "../stores/translate-store";
import LanguageSelector from "./LanguageSelector";

const InputInterface = ({ id }: { id: number }) => {
  const { translations, updateInput, updateTranslation } = useTranslateStore();

  const handleKeyPressed = async (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.code !== "Enter") {
      return;
    } else if (event.code !== "Enter" && event.shiftKey) {
      return;
    }
    event.preventDefault();
    const res = await fetch("/api/openai", {
      method: "POST",
      body: JSON.stringify({
        input: translations[id].input,
        target: translations[id].target,
      }),
    });

    updateTranslation(id, await res.json());
  };

  return (
    <div className="flex flex-col w-full h-[400px] border-1 rounded-xl">
      <LanguageSelector id={id} />
      <div className="flex flex-row gap-2 grow h-[80%]">
        <div className="w-[50%]">
          <textarea
            className="size-full resize-none p-2 rounded-xl"
            placeholder="Start typing..."
            onKeyDown={handleKeyPressed}
            onChange={(e) => {
              updateInput(id, e.target.value);
            }}
          ></textarea>
        </div>
        <div className="w-[50%] overflow-auto pb-1">
          <Suspense fallback={"Loading..."}>
            {!translations[id].translation &&
              "Translation will be displayed here"}
            <pre className="text-wrap">{translations[id].translation}</pre>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default InputInterface;

import React, { useEffect, useState } from "react";

interface SupportedLanguage {
  language: string;
  name: string;
}

interface Props {
  lang: string;
  setLang: (target: string) => void;
}

const LanguageSelector = ({ lang, setLang }: Props) => {
  useEffect(() => {
    fetch(
      `https://translation.googleapis.com/language/translate/v2/languages?key=${process
        .env.NEXT_PUBLIC_API_KEY!}`,
      {
        method: "POST",
        body: '{"target": "en"}',
      }
    )
      .then((res) => res.json())
      .then((json) => {
        const handPicked = json.data.languages.filter(
          (l: { language: string }) =>
            ["en", "es", "zh-TW", "ja"].includes(l.language)
        );
        setLanguages(handPicked);
        // console.log(json);
      });
  }, []);

  const regularStyle = "hover:bg-sky-100 p-2";
  const selectedStyle = "bg-sky-200 p-2";
  const [languages, setLanguages] = useState<SupportedLanguage[]>([]);

  return (
    <div className="flex flex-row flex-wrap">
      {languages?.map((sl) => (
        <button
          key={sl.language}
          className={lang === sl.language ? selectedStyle : regularStyle}
          onClick={() => setLang(sl.language)}
        >
          {sl.name}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;

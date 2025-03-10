import useTranslateStore from "../stores/translate-store";

const LanguageSelector = ({ id }: { id: number }) => {
  const languages = [
    "English",
    "Traditional Chinese",
    "Korean",
    "Spanish",
    "Hindi",
  ];

  const { translations, updateTarget } = useTranslateStore();
  const regularStyle = "grow p-2 hover:bg-sky-100";
  const selectedStyle =
    "grow p-2 bg-sky-200 border-b-1 border-b-sky-500 font-bold";

  return (
    <div className="flex flex-row flex-wrap items-center px-1 mb-1">
      <span className="font-extrabold">Target language</span>
      {languages?.map((sl) => (
        <button
          key={sl}
          className={
            translations[id].target === sl ? selectedStyle : regularStyle
          }
          onClick={() => updateTarget(id, sl)}
        >
          {sl}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;

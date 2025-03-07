import InputContainer from "./components/InputContainer";
import TranslateContainer from "./components/TranslateContainer";

export default function Home() {
  return (
    <main className="h-[70vh] flex flex-row">
      <InputContainer />
      <TranslateContainer />
    </main>
  );
}

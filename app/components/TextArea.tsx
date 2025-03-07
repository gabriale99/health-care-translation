"use client";

interface Props {
  input: string;
  onChange?: (input: string) => void;
  disabled: boolean;
}

const TextArea = ({ input, onChange, disabled }: Props) => {
  return (
    <textarea
      className="resize-none border-1 rounded-md w-full h-[90%] p-2"
      disabled={disabled}
      onChange={(e) => {
        if (disabled) return;
        if (!!onChange) {
          onChange(e.target.value);
        } else {
          console.log("onChange method not set");
        }
      }}
      value={input}
    ></textarea>
  );
};

export default TextArea;

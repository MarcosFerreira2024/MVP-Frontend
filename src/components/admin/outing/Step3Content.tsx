import React, { useState, useEffect, useRef } from "react";
import TextArea from "../../TextArea";
import { validateImageJson } from "../../../helpers/validationSchemas";

type SetStringDispatch = React.Dispatch<React.SetStateAction<string>>;
type SetBooleanDispatch = React.Dispatch<React.SetStateAction<boolean>>;

type Step3ContentProps = {
  imageJson: string;
  setImageJson: SetStringDispatch;
  setIsValid: SetBooleanDispatch;
};

export function Step3Content({
  imageJson,
  setImageJson,
  setIsValid,
}: Step3ContentProps) {
  const [rawImageJsonInput, setRawImageJsonInput] = useState(imageJson);
  const debounceTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    setRawImageJsonInput(imageJson);
  }, [imageJson]);

  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      if (rawImageJsonInput.trim() === "") {
        setIsValid(false);
        setImageJson("");
        return;
      }

      const validationResult = validateImageJson(rawImageJsonInput);
      if (!validationResult.success) {
        setIsValid(false);
      } else {
        setIsValid(true);
        setImageJson(rawImageJsonInput);
      }
    }, 500);

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [rawImageJsonInput, setImageJson, setIsValid]);

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setRawImageJsonInput(newValue);

    if (newValue.trim() !== "") {
      setIsValid(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <h2 className="text-green-900 text-xl font-bold">Imagens e Mídia</h2>

      <TextArea
        to="image"
        value={rawImageJsonInput}
        onChange={handleTextAreaChange}
        placeholder={`[\n  {\n    "url": "https://exemplo.com/foto1.jpg",\n    "alt": "Descrição da foto"\n  }\n]`}
        rows={15}
        text="Cole as informações das imagens em formato JSON Array (Ex: [{ 'url': '...','alt':'...', }]"
      />
    </div>
  );
}

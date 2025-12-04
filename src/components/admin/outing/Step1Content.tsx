import type {
  DataItem,
  SetDataItemDispatch,
  SetStringDispatch,
} from "../../../hooks/useOutingCreation";
import Input from "../../Input";
import Label from "../../Label";
import TextArea from "../../TextArea";
import { SelectionButtons } from "./SelectionButtons";

type Step1ContentProps = {
  title: string;
  setTitle: SetStringDispatch;
  city: DataItem;
  setCity: SetDataItemDispatch;
  cities: DataItem[];
  category: DataItem;
  setCategory: SetDataItemDispatch;
  categories: DataItem[];
  description: string;
  setDescription: SetStringDispatch;
  price: string;
  setPrice: SetStringDispatch;
  slug: string;
  setSlug: SetStringDispatch;
};

function Step1Content({
  title,
  setTitle,
  city,
  setCity,
  cities,
  category,
  setCategory,
  categories,
  description,
  setDescription,
  price,
  setPrice,
  slug,
  setSlug,
}: Step1ContentProps) {
  return (
    <div className="flex flex-col h-full gap-4 w-full">
      <Label to="title" className="text-main text-xl" text="Titulo">
        <Input
          id="title"
          className="text-sm w-full"
          type="text"
          value={title}
          placeholder="Digite um titulo para o passeio"
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
      </Label>

      <SelectionButtons
        data={cities}
        selectedItem={city}
        setSelectedItem={setCity}
        label="Cidade"
      />

      <SelectionButtons
        data={categories}
        selectedItem={category}
        setSelectedItem={setCategory}
        label="Categoria"
      />

      <TextArea
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Digite uma descrição para o passeio"
        rows={6}
        text="Descrição"
        to={"description"}
        value={description}
      />

      <div className="flex justify-start items-end w-full gap-2">
        <Label
          to="price"
          className="text-main text-xl max-w-[300px]"
          text="Preço"
        >
          <Input
            id="price"
            className="text-sm w-full"
            type="text"
            value={price}
            placeholder="Ex: 00.00"
            onChange={(e) => setPrice(e.currentTarget.value)}
          />
        </Label>
        <Label
          to="slug"
          className="text-main text-xl max-w-[300px]"
          text="Slug (url)"
        >
          <Input
            id="slug"
            className="text-sm w-full"
            type="text"
            value={slug}
            placeholder="Ex: montanha-russa"
            onChange={(e) => setSlug(e.currentTarget.value)}
          />
        </Label>
      </div>
    </div>
  );
}

export { Step1Content };

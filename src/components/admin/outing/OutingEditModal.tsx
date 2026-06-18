import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Input from "../../Input";
import TextArea from "../../TextArea";
import Label from "../../Label";
import Button from "../../Button";
import useOutingEdit from "../../../hooks/useOutingEdit";
import type { OutingResponse } from "../../../types/Outing";

type OutingEditModalProps = {
  isOpen: boolean;
  outing: OutingResponse | null;
  onClose: () => void;
  onSuccess: (data?: Record<string, unknown>) => void;
};

const cities = [
  { id: 1, name: "Teresópolis" },
  { id: 2, name: "Petrópolis" },
  { id: 3, name: "Nova Friburgo" },
  { id: 4, name: "Guapimirim" },
  { id: 5, name: "Cachoeiras de Macacu" },
  { id: 6, name: "São José do Vale do Rio Preto" },
  { id: 7, name: "Sumidouro" },
  { id: 8, name: "Sapucaia" },
  { id: 9, name: "Areal" },
];

function OutingEditModal({ isOpen, outing, onClose, onSuccess }: OutingEditModalProps) {
  const { form, set, setBool, handleSubmit, loading } = useOutingEdit(outing, onClose, onSuccess);
  const categoryName = outing?.category?.name ?? "";

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] p-2 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: "linear", duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-gray-50 p-4 sm:p-6 rounded-lg w-full max-w-lg md:max-w-xl lg:max-w-2xl relative shadow-lg max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer z-10"
              onClick={onClose}
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-green-900">
              Editar Passeio
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="flex flex-col gap-4 sm:gap-6"
            >
              {/* ===== Seção 1: Dados Base ===== */}
              <div>
                <h3 className="text-green-800 font-semibold text-sm sm:text-base mb-3 border-b border-gray-200 pb-1">
                  Dados Base
                </h3>

                <Label to="title" text="Título" className="text-main text-sm sm:text-base">
                  <Input id="title" type="text" value={form.title} onChange={set("title")} placeholder="Título do passeio" />
                </Label>

                <div className="mt-3">
                  <TextArea
                    to="content"
                    text="Descrição"
                    value={form.content}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => set("content")(e)}
                    placeholder="Descrição do passeio"
                    rows={3}
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:gap-4 mt-3">
                  <Label to="price" text="Preço" className="text-main text-sm sm:text-base flex-1">
                    <Input id="price" type="text" value={form.price} onChange={set("price")} placeholder="0.00" />
                  </Label>
                  <Label to="slug" text="Slug (URL)" className="text-main text-sm sm:text-base flex-1 mt-3 sm:mt-0">
                    <Input id="slug" type="text" value={form.slug} onChange={set("slug")} placeholder="slug-do-passeio" />
                  </Label>
                </div>

                <div className="flex flex-col sm:flex-row sm:gap-4 mt-3">
                  <Label to="latitude" text="Latitude" className="text-main text-sm sm:text-base flex-1">
                    <Input id="latitude" type="text" value={form.latitude} onChange={set("latitude")} placeholder="-22.425" />
                  </Label>
                  <Label to="longitude" text="Longitude" className="text-main text-sm sm:text-base flex-1 mt-3 sm:mt-0">
                    <Input id="longitude" type="text" value={form.longitude} onChange={set("longitude")} placeholder="-42.975" />
                  </Label>
                </div>

                <Label to="cityId" text="Cidade" className="text-main text-sm sm:text-base mt-3">
                  <select
                    id="cityId"
                    value={form.cityId}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => set("cityId")(e)}
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                  >
                    {cities.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </Label>
              </div>

              {/* ===== Seção 2: Dados Específicos da Categoria ===== */}
              {categoryName && (
                <div>
                  <h3 className="text-green-800 font-semibold text-sm sm:text-base mb-3 border-b border-gray-200 pb-1">
                    {categoryName === "Trilha" && "Detalhes da Trilha"}
                    {categoryName === "Parque" && "Detalhes do Parque"}
                    {categoryName === "Evento" && "Detalhes do Evento"}
                  </h3>

                  {categoryName === "Trilha" && (
                    <div className="flex flex-col gap-3">
                      <Label to="difficulty" text="Dificuldade" className="text-main text-sm sm:text-base">
                        <select
                          id="difficulty"
                          value={form.difficulty}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => set("difficulty")(e)}
                          className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                        >
                          <option value="Fácil">Fácil</option>
                          <option value="Médio">Médio</option>
                          <option value="Difícil">Difícil</option>
                        </select>
                      </Label>

                      <div className="flex flex-col sm:flex-row sm:gap-4">
                        <Label to="duration" text="Duração (min)" className="text-main text-sm sm:text-base flex-1">
                          <Input id="duration" type="number" value={form.duration} onChange={set("duration")} placeholder="120" />
                        </Label>
                        <Label to="distance" text="Distância (km)" className="text-main text-sm sm:text-base flex-1 mt-3 sm:mt-0">
                          <Input id="distance" type="text" value={form.distance} onChange={set("distance")} placeholder="5.5" />
                        </Label>
                      </div>

                      <Label to="roundTrip" text="Ida e Volta" className="text-main text-sm sm:text-base">
                        <Button
                          type="button"
                          onClick={() => setBool("roundTrip")(!form.roundTrip)}
                          variant={form.roundTrip ? "contrast" : "default"}
                          className="h-10"
                        >
                          {form.roundTrip ? "Sim" : "Não"}
                        </Button>
                      </Label>
                    </div>
                  )}

                  {categoryName === "Parque" && (
                    <div className="flex flex-col gap-3">
                      <Label to="biodiversity" text="Biodiversidade" className="text-main text-sm sm:text-base">
                        <Input id="biodiversity" type="text" value={form.biodiversity} onChange={set("biodiversity")} placeholder="Descrição da biodiversidade" />
                      </Label>
                      <Label to="maximumCapacityPark" text="Capacidade Máxima" className="text-main text-sm sm:text-base">
                        <Input id="maximumCapacityPark" type="number" value={form.maximumCapacityPark} onChange={set("maximumCapacityPark")} placeholder="500" />
                      </Label>
                    </div>
                  )}

                  {categoryName === "Evento" && (
                    <div className="flex flex-col gap-3">
                      <Label to="maximumCapacityEvent" text="Capacidade Máxima" className="text-main text-sm sm:text-base">
                        <Input id="maximumCapacityEvent" type="number" value={form.maximumCapacityEvent} onChange={set("maximumCapacityEvent")} placeholder="300" />
                      </Label>
                      <div className="flex flex-col sm:flex-row sm:gap-4">
                        <Label to="startDate" text="Data Inicial" className="text-main text-sm sm:text-base flex-1">
                          <Input id="startDate" type="datetime-local" value={form.startDate} onChange={set("startDate")} />
                        </Label>
                        <Label to="endDate" text="Data Final" className="text-main text-sm sm:text-base flex-1 mt-3 sm:mt-0">
                          <Input id="endDate" type="datetime-local" value={form.endDate} onChange={set("endDate")} />
                        </Label>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ===== Seção 3: Fotos ===== */}
              <div>
                <h3 className="text-green-800 font-semibold text-sm sm:text-base mb-3 border-b border-gray-200 pb-1">
                  Fotos
                </h3>
                <p className="text-xs text-gray-500 mb-2">
                  Array JSON de objetos com <code>alt</code> e <code>url</code>. Exemplo:{" "}
                  <code>{'[{ "alt": "Foto", "url": "https://..." }]'}</code>. Enviar substitui todas as fotos atuais.
                </p>
                <TextArea
                  to="photosJson"
                  text="Fotos (JSON)"
                  value={form.photosJson}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => set("photosJson")(e)}
                  placeholder='[{ "alt": "Descrição", "url": "https://..." }]'
                  rows={4}
                />
              </div>

              {/* ===== Seção 4: Horários ===== */}
              <div>
                <h3 className="text-green-800 font-semibold text-sm sm:text-base mb-3 border-b border-gray-200 pb-1">
                  Horários de Funcionamento
                </h3>
                <p className="text-xs text-gray-500 mb-2">
                  Array JSON de objetos com <code>dayOfWeek</code> (1=segunda a 7=domingo), <code>openTime</code> e{" "}
                  <code>closeTime</code> (formato HH:MM). Exemplo:{" "}
                  <code>{'[{ "dayOfWeek": 1, "openTime": "08:00", "closeTime": "17:00" }]'}</code>.
                  Enviar substitui todos os horários atuais.
                </p>
                <TextArea
                  to="openHoursJson"
                  text="Horários (JSON)"
                  value={form.openHoursJson}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => set("openHoursJson")(e)}
                  placeholder='[{ "dayOfWeek": 1, "openTime": "08:00", "closeTime": "17:00" }]'
                  rows={4}
                />
              </div>

              {/* ===== Botões ===== */}
              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-2">
                <Button type="button" variant="default" onClick={onClose} className="w-full sm:w-auto">
                  Cancelar
                </Button>
                <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                  {loading ? "Salvando..." : "Salvar"}
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default OutingEditModal;

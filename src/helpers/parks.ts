interface ParkCardData {
  src: string;
  to: string;
  name: string;
}

export const parkCards: ParkCardData[] = [
  {
    src: "/tres_picos.webp",
    to: "/outing/parque-estadual-dos-tres-picos",
    name: "Parque Estadual dos Três Picos",
  },
  {
    src: "/parque_nacional.jpg",
    to: "/outing/parque-nacional-serra-dos-orgaos",
    name: "Parque Nacional Serra dos Órgãos",
  },
  {
    src: "/parque_montanhas.jpg",
    to: "/outing/parque-montanhas-teresopolis",
    name: "Parque Natural Municipal Montanhas de Teresópolis",
  },
];

export const categories: { id: number; name: string }[] = [
  { id: 1, name: "Evento" },
  { id: 2, name: "Trilha" },
  { id: 3, name: "Parque" },
];

export const categoryUrlMap: Record<string, string> = {
  Evento: "event",
  Trilha: "trail",
  Parque: "park",
};

export const cities: { id: number; name: string }[] = [
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

function timestampConverter(isoString: string) {
  const data = new Date(isoString);

  const meses = [
    "jan",
    "fev",
    "mar",
    "abr",
    "mai",
    "jun",
    "jul",
    "ago",
    "set",
    "out",
    "nov",
    "dez",
  ];

  const dia = String(data.getUTCDate()).padStart(2, "0");
  const mes = meses[data.getUTCMonth()];
  const ano = data.getUTCFullYear();

  return `${dia} de ${mes}, ${ano}`;
}

export { timestampConverter };

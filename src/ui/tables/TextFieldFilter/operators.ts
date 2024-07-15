import IOperator from "./interfaces/IOperator";

// Todo: between
const baseOperators: IOperator[] = [
    { operator: "==",         label:"=",  tooltip: "Igual"},
    { operator: "contains",   label:"c:", tooltip: "Contém"},
    { operator: "startswith", label:"i:", tooltip: "Inicia com"},
    { operator: "endswith",   label:"t:", tooltip: "Termina com"},
  ];
  const otherOperators: IOperator[] = [
    { operator: ">",  label: ">", tooltip: "Maior que"},
    { operator: ">=", label: "≥", tooltip: "Maior igual a"},
    { operator: "<",  label: "<", tooltip: "Menor que"},
    { operator: "<=", label: "≤", tooltip: "Menor igual a"},
  ];
  // Deixar operadores mais amigaveis?
  export const operatorsBy = {
    string: baseOperators,
    number: [...baseOperators, ...otherOperators],
    date: [baseOperators[0], ...otherOperators],
  };
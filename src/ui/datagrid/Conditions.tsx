export class Condition {
    public operator: string;
    public label: string;
    public tooltip: string;
    
    constructor(operator: string, label: string, tooltip: string) {
      this.operator = operator;
      this.label = label;
      this.tooltip = tooltip;    
    }
  
    query(source: string, value: string|number): string {
      const operators = ["contains", "startsWith", "endsWith"]
      if (operators.includes(this.operator)){
        return `${source}.${this.operator}('${value}')`;
      }
      if (typeof value === 'number' && !Number.isNaN(value))
        return `${source}${this.operator}${value}`;
      return `${source}${this.operator}'${value}'`;
    }
  }

  // Todo: between
  const base_conditions:Condition[] = [ // Posso usar na montagem do get para api
    new Condition("==", "=", "Igual"),
    new Condition("contains", "c:", "Contém"),
    new Condition("startsWith", "i:", "Inicia com"),
    new Condition("endsWith", "t:", "Termina com"),
  ];
  const other_conditions:Condition[] = [ // Posso usar na montagem do get para api
    new Condition(">", ">", "Maior que"),
    new Condition(">=", "≥", "Maior igual a"),
    new Condition("<", "<", "Menor que"),
    new Condition("<=", "≤", "Menor igual a"),
  ];
  // Deixar operadores mais amigaveis?
  export const conditions = {
    string: base_conditions,
    number: [...base_conditions, ...other_conditions],
    date: [ base_conditions[0], ...other_conditions],
  };
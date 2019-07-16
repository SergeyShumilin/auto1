export interface Option {
  label: string;
  value: string;
}

export interface Event {
  target: { value: string };
}

export interface History {
  push(url: string): void;
}

export interface Car {
  stockNumber: number;
  manufacturerName?: string;
  modelName?: string;
  mileage?: { number: number; unit: string };
  fuelType?: string;
  color?: string;
}

export interface Filter {
  color?: string;
  manufacturer?: string;
}

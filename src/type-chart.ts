import typeChartJson from "../resources/type-charts.json";
import { Effectiveness, PokemonType } from "./schema";

type TypeChart = {
  [key in PokemonType]: Effectiveness;
};

const EMPTY_CHART: Effectiveness = {
  weaknesses: [],
  resistances: [],
  immunities: [],
};

export const getChartByType = (type: PokemonType): Effectiveness =>
  (typeChartJson as TypeChart)[type] ?? EMPTY_CHART;

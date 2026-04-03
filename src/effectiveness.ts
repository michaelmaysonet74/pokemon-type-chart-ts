import { getChartByType } from "./type-chart";
import {
  Effectiveness,
  EffectivenessResponse,
  Pokemon,
  PokemonType,
} from "./schema";

const merge = (charts: Effectiveness[]): Effectiveness => {
  const weaknesses = new Set(
    charts.flatMap(({ weaknesses }) => weaknesses).toSorted(),
  );

  const resistances = new Set(
    charts.flatMap(({ resistances }) => resistances).toSorted(),
  );

  const immunities = new Set(
    charts.flatMap(({ immunities }) => immunities).toSorted(),
  );

  return {
    weaknesses: Array.from(
      weaknesses.difference(resistances.union(immunities)),
    ),
    resistances: Array.from(
      resistances.difference(weaknesses.union(immunities)),
    ),
    immunities: Array.from(immunities),
  };
};

const calculate = (types: PokemonType[]): Effectiveness => {
  const charts = types.map(getChartByType);
  return charts.length === 1 ? charts[0] : merge(charts);
};

export const getEffectivenessResponse = (
  pokemon: Pokemon,
): EffectivenessResponse => ({
  pokemon,
  effectiveness: calculate(pokemon.types),
});

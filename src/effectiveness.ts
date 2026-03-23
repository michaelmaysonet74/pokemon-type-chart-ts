import { getChartByType } from "./type-chart";
import {
  Effectiveness,
  EffectivenessResponse,
  Pokemon,
  PokemonType,
} from "./schema";

const merge = (charts: Effectiveness[]): Effectiveness => {
  const weaknesses = charts.flatMap(({ weaknesses }) => weaknesses).sort();
  const resistances = charts.flatMap(({ resistances }) => resistances).sort();
  const immunities = charts.flatMap(({ immunities }) => immunities).sort();

  return {
    weaknesses: Array.from(
      new Set(
        weaknesses.filter((t) => ![...resistances, ...immunities].includes(t)),
      ),
    ),
    resistances: Array.from(
      new Set(
        resistances.filter((t) => ![...weaknesses, ...immunities].includes(t)),
      ),
    ),
    immunities,
  };
};

const calculate = (types: PokemonType[]): Effectiveness =>
  merge(types.map(getChartByType));

export const getEffectivenessResponse = (
  pokemon: Pokemon,
): EffectivenessResponse => ({
  pokemon,
  effectiveness: calculate(pokemon.types),
});

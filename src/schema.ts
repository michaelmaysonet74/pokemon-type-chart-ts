import z from "zod";

export enum PokemonType {
  BUG = "Bug",
  DARK = "Dark",
  DRAGON = "Dragon",
  ELECTRIC = "Electric",
  FAIRY = "Fairy",
  FIGHTING = "Fighting",
  FIRE = "Fire",
  FLYING = "Flying",
  GHOST = "Ghost",
  GRASS = "Grass",
  GROUND = "Ground",
  ICE = "Ice",
  NORMAL = "Normal",
  POISON = "Poison",
  PSYCHIC = "Psychic",
  ROCK = "Rock",
  STEEL = "Steel",
  WATER = "Water",
}

export const PokemonTypeSchema = z.enum([
  PokemonType.BUG,
  PokemonType.DARK,
  PokemonType.DRAGON,
  PokemonType.ELECTRIC,
  PokemonType.FAIRY,
  PokemonType.FIGHTING,
  PokemonType.FIRE,
  PokemonType.FLYING,
  PokemonType.GHOST,
  PokemonType.GRASS,
  PokemonType.GROUND,
  PokemonType.ICE,
  PokemonType.NORMAL,
  PokemonType.POISON,
  PokemonType.PSYCHIC,
  PokemonType.ROCK,
  PokemonType.STEEL,
  PokemonType.WATER,
]);

const PokemonTypeArraySchema = z
  .array(PokemonTypeSchema)
  .refine((types) => new Set(types).size === types.length, {
    message: "Types must be unique",
  });

export const PokemonSchema = z.object({
  name: z.string(),
  types: PokemonTypeArraySchema.min(1).max(2),
});
export type Pokemon = z.infer<typeof PokemonSchema>;

export const EffectivenessSchema = z.object({
  weaknesses: PokemonTypeArraySchema,
  resistances: PokemonTypeArraySchema,
  immunities: PokemonTypeArraySchema,
});
export type Effectiveness = z.infer<typeof EffectivenessSchema>;

export const EffectivenessRequestSchema = z.object({
  pokemon: PokemonSchema,
});
export type EffectivenessRequest = z.infer<typeof EffectivenessRequestSchema>;

export const EffectivenessResponseSchema = z.object({
  pokemon: PokemonSchema,
  effectiveness: EffectivenessSchema,
});
export type EffectivenessResponse = z.infer<typeof EffectivenessResponseSchema>;

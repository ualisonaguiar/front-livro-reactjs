export const CategoriaEnumSituacao = {
  ATIVO: "Ativo",
  INATIVO: "Inativo",
} as const;

export type CategoriaEnumSituacao =
  (typeof CategoriaEnumSituacao)[keyof typeof CategoriaEnumSituacao];

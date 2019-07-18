type Id = {
  id: number;
};

export type UserNoId = {
  name: string;
  health: number;
  attack: number;
  defense: number;
  source: string;
};

export type User = UserNoId & Id;

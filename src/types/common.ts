export interface VersionCheckSuccess {
  version: number;
}

export interface AxiosResponseSuccess {
  success: boolean;
}

export type SortOption = {
  sub: string;
  name: string;
  option: string;
  icon: string;
};

export type SetTeamNumber = 0 | 1;
export type SetNumber = SetTeamNumber | 2;

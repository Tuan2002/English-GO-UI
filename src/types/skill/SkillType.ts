export interface ISkill {
  id: string;
  name: string;
  displayName: string;
  description: string;
  image: string;
}

export interface ISkillDataUpdate {
  skillId: string;
  image?: string;
  description?: string;
}

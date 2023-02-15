export interface IClient {}

export interface ITraining {
  id: string;
  name: string;
  url: string;
}

export interface ITrainings {
  trainings: ITraining[]
}
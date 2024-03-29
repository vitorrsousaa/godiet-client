import { LOCAL_STORAGE_KEYS } from '@godiet-config';

export class PlanningMealStorage<T> {
  private privateKey: string;

  constructor(
    key: string,
    private readonly defaultValue: unknown
  ) {
    this.privateKey = `${LOCAL_STORAGE_KEYS.PLANNING_MEAL}-${key}`;
  }

  get(): T {
    const savedData = localStorage.getItem(this.privateKey);

    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (err) {
        console.log(err);
        return this.defaultValue as T;
      }
    }

    return this.defaultValue as T;
  }

  set(data: T) {
    localStorage.setItem(this.privateKey, JSON.stringify(data));
  }

  remove() {
    localStorage.removeItem(this.privateKey);
  }
}

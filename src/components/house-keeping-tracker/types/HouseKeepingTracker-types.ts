export interface SelectedHouseTasks {
  [key: string]: HouseTask;
  living: HouseTask;
  balcony: HouseTask;
  kitchen: HouseTask;
  bathroom: HouseTask;
  bedroom: HouseTask;
  studio: HouseTask;
}

interface HouseTask {
  lastUpdate: string;
  delayInDays: number;
  // currentDate - delayInDays < lastUpdate => status
}

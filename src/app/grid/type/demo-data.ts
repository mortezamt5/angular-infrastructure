import {DemoDto} from './demo-dto';

export const DEMO_DATA: DemoDto[] = [
  {
    id: 1, name: 'alireza', age: 38, birthDate: new Date(1985, 11, 25),
    cash: 150000, isActive: true, registerDate: new Date(2021, 1, 5),
    presentTime: new Date(2021, 1, 5, 11, 11, 8)
  },
  {
    id: 2, name: 'morteza mousavi', age: 35, birthDate: new Date(1986, 9, 11),
    cash: 23000000, isActive: true, registerDate: new Date(2020, 5, 5),
    presentTime: new Date(2021, 1, 5, 11, 15, 3)
  },
  {
    id: 3, name: 'saber abar', age: 45, birthDate: new Date(1970, 10, 1),
    cash: 56000000, isActive: false, registerDate: new Date(2019, 6, 25),
    presentTime: new Date(2021, 1, 5, 8, 9, 50)
  },
  {
    id: 4, name: 'mohammadreza lotfi', age: 80, birthDate: new Date(1940, 5, 3),
    cash: 330000000, isActive: true, registerDate: new Date(2018, 5, 18),
    presentTime: new Date(2021, 1, 5, 2, 7, 35)
  },
  {
    id: 5, name: 'sadegh ', age: 18, birthDate: new Date(1995, 6, 15),
    cash: 25000000, isActive: true, registerDate: new Date(2021, 3, 8),
    presentTime: new Date(2021, 1, 5, 9, 15, 31)
  },
  {
    id: 6, name: 'parviz ', age: 25, birthDate: new Date(1990, 7, 29),
    cash: 12000000, isActive: true, registerDate: new Date(2022, 4, 3),
    presentTime: new Date(2021, 1, 5, 11, 23, 42)
  },
];

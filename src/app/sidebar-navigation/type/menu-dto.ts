export interface MenuDto {
  id:string,
  level: 'L1' | 'L2';
  label: string;
  icon?: string;
  parentId?: string;
  routeLink?: string;
  children?: MenuDto[];
}

export const MENUE_ITEMS: MenuDto[] = [
  {
    level: 'L1',
    id:'components',
    label: 'Components',
    icon: 'fa-solid fa-toolbox',
    children: [
      {
        level: 'L1',
        label: 'Grid',
        id:'grid',
        icon: 'fa-solid fa-grip',
        children: [
          {
            id:'clientData',
            level: 'L2',
            label: 'Client Data',
            icon: 'fa-solid fa-mug-hot',
            routeLink: 'grid/client',
          },
          {
            id:'remoteData',
            level: 'L2',
            label: 'Remote Data',
            icon: 'fa-solid fa-server',
            routeLink: 'grid/remote',
          },
        ],
      },
      {
        id:'select',
        level: 'L1',
        label: 'Select',
        icon: 'fa-solid fa-check',
        routeLink: 'select-demo',
      },
      {
        id:'dataTime',
        level: 'L1',
        label: 'Date & Time',
        icon: 'fa-regular fa-calendar',
        children: [
          {
            id:'datePickerJalali',
            level: 'L2',
            label: 'Date Picker Jalai',
            icon: 'fa-solid fa-calendar-day',
            routeLink: 'date-time',
          },
          {
            id:'datePickerGregorian',
            level: 'L2',
            label: 'Date Picker Gregorian',
            icon: 'fa-solid fa-calendar-minus',
            routeLink: 'date-time/gregorian',
          },
          {
            id:'timePicker',
            level: 'L2',
            label: 'Time Picker',
            icon: 'fa-solid fa-calendar-week',
            routeLink: 'date-time/time',
          },
          {
            id:'rangePicker',
            level: 'L2',
            label: 'Range Date Picker',
            icon: 'fa-solid fa-calendar-plus',
            routeLink: 'date-time/range',
          }
        ],
      },
    ],
  },
];

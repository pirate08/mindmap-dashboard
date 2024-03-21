export const data = {
  name: 'Car Dashboard',
  children: [
    {
      name: 'Research',
      children: [
        {
          name: 'External',
          children: [
            {
              name: 'B2C',
              children: [
                { name: 'Online' },
                { name: 'Interview' },
                { name: 'Public Data' },
                { name: 'Health' },
              ],
            },
            { name: 'B2D', children: [] }, // Add an empty children array for B2D
          ],
        },
        { name: 'Internal', children: [] }, // Add an empty children array for Internal
      ],
    },
    {
      name: 'Planning',
      children: [
        {
          name: 'PRD',
          children: [],
        },
        {
          name: 'Specs',
          children: [],
        },
      ],
    }, // Add an empty children array for Planning
    {
      name: 'Designing',
      children: [
        {
          name: 'Hardware',
          children: [],
        },
        {
          name: 'Software',
          children: [],
        },
      ],
    }, // Add an empty children array for Designing
    {
      name: 'Manufacturing',
      children: [
        {
          name: 'Material',
          children: [],
        },
        {
          name: 'Production',
          children: [],
        },
      ],
    }, // Add an empty children array for Manufacturing
    {
      name: 'Sales/Marketing',
      children: [
        {
          name: 'Online Marketing',
          children: [],
        },
        {
          name: 'Dealership',
          children: [],
        },
      ],
    }, // Add an empty children array for Sales/Marketing
  ],
};

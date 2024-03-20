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
    { name: 'Planning', children: [] }, // Add an empty children array for Planning
    { name: 'Designing', children: [] }, // Add an empty children array for Designing
    { name: 'Manufacturing', children: [] }, // Add an empty children array for Manufacturing
    { name: 'Sales/Marketing', children: [] }, // Add an empty children array for Sales/Marketing
  ],
};

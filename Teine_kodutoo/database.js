// Mock database
const database = {
  courses: [
    {
      id: 1,
      teacherById: 1,
      name: 'Riistvara',
    },
    {
      id: 2,
      teacherById: 2,
      name: 'Programmeerimine 2',
    },
  ],
  

  teachers: [
    {
      id: 1,
      firstName: 'Martti',
      lastName: 'Raavel',
    },
    {
      id: 2,
      firstName: 'Andrus',
      lastName: 'Rinde',
    },
  ],

  rooms: [
    {
      id: 1,
      description: '101',
    },
    {
      id: 2,
      description: '102',
    },
    {
      id: 3,
      description: '304',
    },
  ],  
  
  days: [
    {
      id: 1,
      description: 'Esmaspäev',
    },
    {
      id: 2,
      description: 'Teisipäev',
    },
    {
      id: 3,
      description: 'Kolmapäev',
    },
    {
      id: 4,
      description: 'Neljapäev',
    },
    {
      id: 5,
      description: 'Reede',
    },
    {
      id: 6,
      description: 'Laupäev',
    },
    {
      id: 7,
      description: 'Pühapäev',
    },
  ],  
  
};

module.exports = database;

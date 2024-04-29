const users = [
  {
    name: "John Doe",
    email: "john.doe@dominioempresa.com",
    dateStart: new Date("2023-01-01"),
    dateEnd: new Date("2024-01-01"),
  },
  {
    name: "John Two",
    email: "john.two@dominioempresa.com",
    dateStart: new Date("2023-01-01"),
    dateEnd: new Date("2024-01-01"),
  },
  {
    name: "John Three",
    email: "john.three@dominioempresa.com",
    dateStart: new Date("2023-01-01"),
    dateEnd: new Date("2025-01-01"),
  },
  {
    name: "John Four",
    email: "john.four@dominioempresa.com",
    dateStart: new Date("2023-01-01"),
    dateEnd: new Date("2025-01-01"),
  },
];

const getByEmail = async (email) => {
  return new Promise((resolve, reject) => {
    const user = users.filter((user) => {
      if (user.email !== email) {
        return false;
      }
      if (user.dateStart > new Date()) {
        return false;
      }
      if (user.dateEnd < new Date()) {
        return false;
      }
      return true;
    });
    resolve(user[0]);
  });
};

const getAll = async () => {
  return new Promise((resolve, reject) => {
    resolve(users);
  });
};

module.exports = {
  getAll,
  getByEmail,
};

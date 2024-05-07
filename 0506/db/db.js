const { Sequelize } = require("sequelize");

class DB {
  static instance = null;
  db = null;

  constructor() {
    this.db = new Sequelize({
      dialect: "sqlite",
      storage: "/db/database.sqlite",
    });
    this.loadModels();
  }

  static getInstance() {
    if (this.instance === null) {
      this.instance = new DB();
    }
    return this.instance;
  }

  async testConnection() {
    try {
      await this.db.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }

  loadModels() {
    const User = this.db.define(
      "User",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        lastname: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
      }
    );
  }
}

module.exports = {
  DB,
};

export default {
  client: "sqlite3",
  connection: {
    filename: "./src/database/database.db", //
  },
  // foreign key restriction
  pool: {
    afterCreate: (connection: any, done: any) => {
      connection.run("PRAGMA foreign_keys = ON");
      done();
    },
  },
  useNullAsDefault: true,
  migrations: {
    extends: "ts",
    directory: "./src/database/migrations",
  },
  seeds: {
    extensions: "ts",
    directory: "./src/database/seeds",
  },
};

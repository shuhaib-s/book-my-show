export const up = (pgm) => {
    pgm.createTable("user", {
      id: {
        type: "uuid",
        primaryKey: true,
        default: pgm.func("gen_random_uuid()"),
      },
      name: { type: "varchar(100)", notNull: true },
      email: { type: "varchar(150)", notNull: true, unique: true },
      password: { type: "text", notNull: true },
      phone: { type: "varchar(20)" },
      created_at: { type: "timestamp", notNull: true, default: pgm.func("current_timestamp") },
      updated_at: { type: "timestamp", notNull: true, default: pgm.func("current_timestamp") },
    });
  };
  
  export const down = (pgm) => {
    pgm.dropTable("user");
  };
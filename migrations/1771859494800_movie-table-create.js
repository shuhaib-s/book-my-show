
export const shorthands = undefined;

export const up = (pgm) => {
    pgm.createTable("movie", {
        id: {
            type: "uuid",
            primaryKey: true,
            default: pgm.func("gen_random_uuid()"),
        },
        title: { type: "varchar(100)", notNull: true },
        description: { type: "text", notNull: true },
        duration: { type: "integer", notNull: true },
        language: { type: "varchar(100)", notNull: true },
        release_date: { type: "timestamp", notNull: true },
        created_at: { type: "timestamp", notNull: true, default: pgm.func("current_timestamp") },
        updated_at: { type: "timestamp", notNull: true, default: pgm.func("current_timestamp") },
    });
};

export const down = (pgm) => {
    pgm.dropTable("movie");
};

/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {

    //theater table
    pgm.createTable("theater", {
        id: {
            type: "uuid",
            primaryKey: true,
            default: pgm.func("gen_random_uuid()"),
        },
        name: { type: "varchar(100)", notNull: true },
        location: { type: "varchar(100)", notNull: true },
        user_id: { type: "uuid", notNull: true, references: "user", onDelete: "cascade" },
        status: { type: "varchar(100)", notNull: true, default: "pending" },
    });
    pgm.addConstraint("theater", "fk_theater_user", {
        foreignKeys: {
            columns: "user_id",
            references: "user",
            onDelete: "cascade",
          },
    });


    //screen table
    pgm.createTable("screen", {
        id: {
            type: "uuid",
            primaryKey: true,
            default: pgm.func("gen_random_uuid()"),
        },
        name: { type: "varchar(100)", notNull: true },
        theater_id: {
            type: "uuid",
            notNull: true,
            references: "theater",
            onDelete: "cascade",
          },
        total_seats: { type: "integer", notNull: true },
        created_at: {
            type: "timestamp",
            default: pgm.func("current_timestamp"),
          },
        updated_at: {
            type: "timestamp",
            default: pgm.func("current_timestamp"),
          },
        created_by:{ type: "varchar(100)", notNull: true },
    });

    pgm.addConstraint("screen", "fk_screens_theater", {
        foreignKeys: {
            columns: "theater_id",
            references: "theater",
            onDelete: "cascade",
          },
    });


    //show table
    pgm.createTable("show", {
        id: {
            type: "uuid",
            primaryKey: true,
            default: pgm.func("gen_random_uuid()"),
        },
        movie_id: {
            type: "uuid",
            notNull: true,
            references: "movie",
            onDelete: "cascade",
          },
        
          theater_id: {
            type: "uuid",
            notNull: true,
            references: "theater",
            onDelete: "cascade",
          },
        
          screen_id: {
            type: "uuid",
            notNull: true,
            references: "screen",
            onDelete: "cascade",
          },
        
          start_time: {
            type: "timestamp",
            notNull: true,
          },
        
          end_time: {
            type: "timestamp",
            notNull: true,
          },
        
          price: {
            type: "numeric",
            notNull: true,
          },
        
          created_at: {
            type: "timestamp",
            default: pgm.func("current_timestamp"),
          },
        
          updated_at: {
            type: "timestamp",
            default: pgm.func("current_timestamp"),
          },
    });
    pgm.addConstraint("show", "fk_show_movie", {
        foreignKeys: {
            columns: "movie_id",
            references: "movie",
            onDelete: "cascade",
          },
    });
    pgm.addConstraint("show", "fk_show_theater", {
        foreignKeys: {
            columns: "theater_id",
            references: "theater",
            onDelete: "cascade",
          },
    });
    pgm.addConstraint("show", "fk_show_screen", {
        foreignKeys: {
            columns: "screen_id",
            references: "screen",
            onDelete: "cascade",
          },
    });
    pgm.addColumn("user", {
        role: { type: "varchar(100)", notNull: true, default: "user" },
        is_approved: { type: "varchar(100)", notNull: true, default: "pending" },
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropTable("screen");
    pgm.dropTable("show");
    pgm.dropColumn("user", "role");
    pgm.dropColumn("user", "is_approved"); 
};

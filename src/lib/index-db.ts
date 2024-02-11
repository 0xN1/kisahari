import Dexie from "dexie";

const db = new Dexie("kisahariDB");
db.version(1).stores({
  entries: "++id, title , content, tldr, created, updated",
});

const entries = db.table("entries");

export { db, entries };

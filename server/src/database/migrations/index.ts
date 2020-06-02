/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import Points from './0.create_points';
import Items from './1.create_items';
import PointItems from './2.create_point_items';

const tables = [Points, Items, PointItems];
const type = process.argv[2];

async function migrate() {
  if (type === '--drop') {
    for (const table of tables.reverse()) {
      await table.drop();
    }
  } else {
    for (const table of tables) {
      await table.create();
    }
  }
}

(async () => {
  await migrate();
  return process.exit(0);
})();

import pg from '../index';

export default {
  async create() {
    await pg.query(`CREATE TABLE IF NOT EXISTS items(
        id serial PRIMARY KEY,
        image varchar(255) NOT NULL,
        title varchar(255) NOT NULL
      );`);

    await pg.query(`INSERT INTO items(title, image) VALUES
      ('Lâmpadas', 'lampadas.svg'),
      ('Pilhas e Baterias', 'baterias.svg'),
      ('Papéis e Papelão', 'papeis-papelao.svg'),
      ('Resíduos Eletrônicos', 'eletronicos.svg'),
      ('Resíduos Orgânicos', 'organicos.svg'),
      ('Óleo de Cozinha', 'oleo.svg');
    `);
    console.log('Created table items');
  },
  async drop() {
    await pg.query('DROP TABLE items');
    console.log('Dropped table items');
  },
};

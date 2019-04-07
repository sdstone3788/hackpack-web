module.exports = {

  development: {
    client: 'sqlite3',
    connection: {

      filename: 'db/posts.db'
    },
    useNullAsDefault: true
  }

};

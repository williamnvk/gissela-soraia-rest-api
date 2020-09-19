module.exports = {
  async up(db, client) {
    const session = client.startSession()
    try {
      await session.withTransaction(async () => {
        db.collection('plans').insertMany([
          {
            slug: 'boostrap-package',
            name: 'Inicial',
            description: 'Permita-se',
            price: 180.0,
            start_at: '2020-10-20',
            end_at: '2020-12-31',
            photos: 15,
          },
        ])
      })
    } finally {
      await session.endSession()
    }
  },

  async down(db, client) {
    const session = client.startSession()
    try {
      //
    } finally {
      await session.endSession()
    }
  },
}

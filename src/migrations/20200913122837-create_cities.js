module.exports = {
  async up(db, client) {
    const session = client.startSession()
    try {
      await session.withTransaction(async () => {
        db.collection('cities').insertMany([
          { name: 'Cruz Machado', district: 'PR' },
          { name: 'Curitiba', district: 'PR' },
          { name: 'União da Vitória', district: 'PR' },
          { name: 'Porto União', district: 'SC' },
        ])
      })
    } finally {
      await session.endSession()
    }
  },

  async down(db, client) {
    const session = client.startSession()
    try {
    } finally {
      await session.endSession()
    }
  },
}

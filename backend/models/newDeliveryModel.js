const db = require('../config/db');

class NewDeliveryModel {
  static async addNewDelivery(nfNumber, userId) {
    const [result] = await db.execute(
      'INSERT INTO deliveries (nfNumber, user_id, status) VALUES (?, ?, ?)',
      [nfNumber, userId, 'pendente']
    );
    return { id: result.insertId, nfNumber, status: 'pendente' };
  }

  static async getDeliveriesByUser(userId) {
    const [rows] = await db.execute(
      'SELECT * FROM deliveries WHERE user_id = ?',
      [userId]
    );
    return rows;
  }

  static async updateDeliveryStatus(id, status) {
    await db.execute('UPDATE deliveries SET status = ? WHERE id = ?', [
      status,
      id,
    ]);
  }

  static async updateDeliveryNF(id, nfNumber) {
    await db.execute('UPDATE deliveries SET nfNumber = ? WHERE id = ?', [
      nfNumber,
      id,
    ]);
  }
}

module.exports = NewDeliveryModel;
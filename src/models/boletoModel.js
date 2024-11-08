const database = require('../config/database');

const Boleto = {
  criar: (boleto, callback) => {
    const { id, cpf, endereco, valor, data_vencimento, status, boleto_anterior } = boleto;
    const query = `INSERT INTO boletos (id, cpf, endereco, valor, data_vencimento, status, boleto_anterior) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    database.query(query, [id, cpf, endereco, valor, data_vencimento, status, boleto_anterior], callback);
  },

  buscarPorCpfEStatus: (cpf, status, callback) => {
    const query = `SELECT id, data_vencimento, data_pagamento FROM boletos WHERE cpf = ? AND status = ?`;
    database.query(query, [cpf, status], callback);
  },

  inativar: (boletoId, callback) => {
    const query = `UPDATE boletos SET status = "Inativo" WHERE id = ?`;
    database.query(query, [boletoId], callback);
  },

  atualizarStatus: (boletoId, dataPagamento, callback) => {
    const query = `UPDATE boletos SET status = 'Pago', data_pagamento = ? WHERE id = ?`;
    database.query(query, [dataPagamento, boletoId], callback);
  },

  buscarPorId: (boletoId, callback) => {
    const query = `SELECT data_pagamento FROM boletos WHERE id = ?`;
    database.query(query, [boletoId], callback);
  },

  cancelar: (boletoId, callback) => {
    const query = `UPDATE boletos SET status = 'Cancelado' WHERE id = ?`;
    database.query(query, [boletoId], callback);
  }
};

module.exports = Boleto;
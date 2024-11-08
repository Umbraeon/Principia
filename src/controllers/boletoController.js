const { v4: uuidv4 } = require('uuid');
const Boleto = require('../models/boletoModel');
const database = require('../config/database');

const BoletoController = {
  gerarBoleto: (req, res) => {
    const { cpf, endereco, valor, dataVencimento } = req.body;

    // Convertee data de vencimento para o formato YYYY-MM-DD
    const dataVencimentoFormatada = dataVencimento.split('/').reverse().join('-');

    Boleto.buscarPorCpfEStatus(cpf, 'Ativo', (err, results) => {
      if (err) {
        console.error('Erro ao consultar o banco de dados:', err);
        res.status(500).send('Erro no servidor.');
        return;
      }

      let boletoEmAtraso = null;
      results.forEach(boleto => {
        if (new Date(boleto.data_vencimento) < new Date()) {
          boletoEmAtraso = boleto;
        }
      });

      if (boletoEmAtraso) {
        // Verificar se o boleto em atraso já foi pago
        if (boletoEmAtraso.data_pagamento) {
          res.status(400).send('Boleto em atraso já foi pago.');
          return;
        }

        Boleto.inativar(boletoEmAtraso.id, (err, results) => {
          if (err) {
            console.error('Erro ao atualizar o banco de dados:', err);
            res.status(500).send('Erro no servidor.');
            return;
          }

          const boletoId = uuidv4();
          const novoBoleto = {
            id: boletoId,
            cpf,
            endereco,
            valor,
            data_vencimento: dataVencimentoFormatada,
            status: 'Ativo',
            boleto_anterior: boletoEmAtraso.id
          };

          Boleto.criar(novoBoleto, (err, results) => {
            if (err) {
              console.error('Erro ao inserir no banco de dados:', err);
              res.status(500).send('Erro no servidor.');
              return;
            }
            res.send(`Boleto gerado com sucesso! ID do boleto: ${boletoId}`);
          });
        });
      } else {
        const boletoId = uuidv4();
        const novoBoleto = {
          id: boletoId,
          cpf,
          endereco,
          valor,
          data_vencimento: dataVencimentoFormatada,
          status: 'Ativo'
        };

        Boleto.criar(novoBoleto, (err, results) => {
          if (err) {
            console.error('Erro ao inserir no banco de dados:', err);
            res.status(500).send('Erro no servidor.');
            return;
          }
          res.send(`Boleto gerado com sucesso! ID do boleto: ${boletoId}`);
        });
      }
    });
  },

  atualizarStatusBoleto: (req, res) => {
    const { boletoId } = req.body;
    const dataPagamento = new Date(); // Data atual

    Boleto.atualizarStatus(boletoId, dataPagamento, (err, results) => {
      if (err) {
        console.error('Erro ao atualizar o banco de dados:', err);
        res.status(500).send('Erro no servidor.');
        return;
      }
      if (results.affectedRows === 0) {
        res.send('Boleto não encontrado.');
      } else {
        res.send(`Boleto ${boletoId} atualizado com sucesso.`);
      }
    });
  },

  cancelarBoleto: (req, res) => {
    const { boletoId } = req.body;

    Boleto.buscarPorId(boletoId, (err, results) => {
      if (err) {
        console.error('Erro ao consultar o banco de dados:', err);
        res.status(500).send('Erro no servidor.');
        return;
      }

      if (results.length   
 > 0 && results[0].data_pagamento) {
        res.status(400).send('Não é possível cancelar um boleto já pago.');
        return;
      }

      Boleto.cancelar(boletoId, (err, results) => {
        if (err) {
          console.error('Erro ao atualizar o banco de dados:', err);
          res.status(500).send('Erro no servidor.');
          return;
        }
        if (results.affectedRows === 0) {
          res.send('Boleto não encontrado.');
        } else {
          res.send(`Boleto ${boletoId} cancelado com sucesso.`);
        }
      });
    });
  },

  listarBoletos: (req, res) => {
    const query = `SELECT id, status FROM boletos`;
    database.query(query, (err, results) => {
      if (err) {
        console.error('Erro ao consultar o banco de dados:', err);
        res.status(500).send('Erro no servidor.');
        return;
      }
      res.json(results);
    });
  }
};

module.exports = BoletoController;
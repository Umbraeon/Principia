# Sistema de Gestão Financeira de Faculdades

## Descrição

Este projeto implementa um sistema de gestão financeira para faculdades, com foco na emissão e controle de boletos. O sistema previne problemas com boletos pagos indevidamente após cancelamento, garantindo que boletos em atraso sejam inativados e substituídos por novos boletos vinculados, evitando cobranças indevidas.

## Módulo Backend

O módulo backend foi desenvolvido em Node.js com Express.js, utilizando o padrão MVC para organizar o código.

**Descrição detalhada do módulo backend:**

* **Linguagem:** JavaScript (Node.js)
* **Framework:** Express.js 
* **Banco de dados:** MySQL
* **Padrão de arquitetura:** MVC 
* **Bibliotecas:**
    * `mysql`: para conexão com o banco de dados MySQL.
    * `uuid`: para gerar IDs únicos para os boletos.
    * `body-parser`: para processar requisições HTTP com corpo JSON.

## Requisitos

**Requisitos Funcionais:**

* Gerar novo boleto.
* Inativar boletos em atraso automaticamente.
* Vincular novo boleto ao boleto inativado.
* Atualizar status do boleto para "Pago".
* Impedir cancelamento de boletos pagos.
* Listar todos os boletos com seus IDs e status.

**Requisitos Não Funcionais:**

* O sistema deve ser confiável e garantir a integridade dos dados.
* O sistema deve ser fácil de usar e manter.
* O sistema deve ter bom desempenho e responder às requisições rapidamente.

**Regras de Negócio:**

* Um boleto é considerado em atraso se a data de vencimento for anterior à data atual.
* Um boleto inativado não pode ser pago.
* Um boleto pago não pode ser cancelado.

**Requisitos de Usuário:**

* Os usuários devem conseguir gerar novos boletos com facilidade.
* Os usuários devem ser informados sobre o status dos seus boletos.
* Os usuários devem ter a garantia de que não serão cobrados indevidamente.

**Requisitos de Sistema:**

* O sistema deve ser compatível com o banco de dados MySQL.
* O sistema deve ser implementado utilizando Node.js e Express.js.

## Análise de Viabilidade

**Técnica:**

A implementação da solução é viável tecnicamente, utilizando tecnologias maduras e amplamente utilizadas no mercado (Node.js, Express.js e MySQL). O padrão MVC facilita o desenvolvimento e a manutenção do código.

**Design:**

A API RESTful foi escolhida por ser uma solução flexível e escalável, permitindo a integração com diferentes sistemas. O banco de dados relacional MySQL é adequado para armazenar os dados do sistema.

## Priorização dos Requisitos

A priorização dos requisitos foi baseada na seguinte ordem de importância:

1.  **Requisitos Funcionais:** São essenciais para o funcionamento do sistema e para atender às necessidades dos usuários.
2.  **Regras de Negócio:** Garantem a integridade do sistema e a conformidade com as políticas da instituição.
3.  **Requisitos Não Funcionais:** Melhoram a qualidade do sistema e a experiência do usuário.
4.  **Requisitos de Usuário:** Definem as expectativas dos usuários em relação ao sistema.
5.  **Requisitos de Sistema:** Definem as restrições técnicas do sistema.

## Diagramas

**Diagrama da Solução**

classDiagram
    class Boleto {
        -id: string
        -cpf: string
        -valor: number
        -data_vencimento: Date
        -status: string
        -boleto_anterior: string
        +gerarBoleto()
        +atualizarStatusBoleto()
        +cancelarBoleto()
    }

**Fluxograma da solução:**

```mermaid
graph TD
    A[Início] --> B{Boleto em atraso?};
    B -- Sim --> C[Inativar boleto em atraso];
    C --> D[Gerar novo boleto];
    D --> E[Fim];
    B -- Não --> D;



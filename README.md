# Pix Code Generator

Esta classe em JavaScript permite gerar códigos Pix válidos para qualquer banco, facilitando a criação de pagamentos via Pix.

## Instalação

1. Execute o comando abaixo em seu projeto:

```bash
npm install pix-generator-code
```

2. Importe o módulo pix-code-generator.

```javascript
import PixGeneratorCode from 'pix-generator-code'
```

## Documentacao

```javascript
const pixGeneratorCode = new PixGeneratorCode({
    pixKey: "CHAVE PIX",
    merchantName: "Jonathan",
    merchantCity: "Sao Paulo",
    amount: 56.90,
    description: "Pix para Jonathan",
    txid: "TXID"
});
      
const payload = pixGeneratorCode.getPayload();
```

## Explicação dos Campos
- pixKey: A chave Pix do destinatário. Pode ser um CPF, CNPJ, número de telefone ou e-mail. Deve seguir os padrões exigidos pelo Banco Central.
- merchantName: Nome do comerciante ou empresa que está recebendo o pagamento.
- merchantCity: Cidade do comerciante.
- amount: Valor da transação. É opcional e, se não fornecido, será considerado 0.
- description: Descrição do pagamento. É opcional, mas pode ser usada para fornecer mais informações sobre a transação.
- txid: ID da transação. Caso não seja informado, será substituído por "***". Ideal para rastreamento e identificação de transações.

```text
`00020126610014br.gov.bcb.pix0111>CHAVE PIX<0224>PIX PARA JONATHAN<52040000530398654045.505802BR5921>JONATHAN<6008>SAO PAULO<62100506>TXID<6304A2F7`
```

## Explicação do Payload:
O retorno da função getPayload() é uma string codificada conforme os padrões exigidos pelo Banco Central para transações via Pix. Essa string inclui várias informações relevantes, como a chave Pix do destinatário, o nome do comerciante, a descrição do pagamento, o valor, entre outros.

- 000201: Cabeçalho do código Pix.
- 26610014: Identificador do QR code.
- br.gov.bcb.pix: Código do Banco Central para Pix.
- 0111>CHAVE PIX<: Chave Pix do recebedor.
- 0224>PIX PARA JONATHAN<: Descrição do pagamento.
- 5204000053039865: Tipo de moeda (BRL) e valor (56,90).
- 0802BR5921>JONATHAN<: Informações do comerciante.
- 6008>SAO PAULO<: Cidade do comerciante.
- 62100506: TXID da transação (opcional).

## Referência

Para mais detalhes sobre a estrutura do Pix, consulte o [Manual de Padrões do Banco Central](https://www.bcb.gov.br/content/estabilidadefinanceira/pix/Regulamento_Pix/II_ManualdePadroesparaIniciacaodoPix.pdf).

## Contato

Jonathan Cruz - [Site](https://jonathansc92.github.io/jonathancruzdev) - [LinkedIn](https://www.linkedin.com/in/jonathancruz/) - jonathansc92@gmail.com
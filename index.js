// const QRCode = require('qrcode');
// const crc = require('crc');

// // Função para calcular o CRC16
// function calculateCRC16(payload) {
//     const crc16 = crc.crc16ccitt(payload);
//     return crc16.toString(16).toUpperCase().padStart(4, '0');
// }

// // Função para criar um código PIX com formato correto
// function createPixCode(chave, nome, cidade, valor) {
//     // Montar o payload com os campos PIX
//     const payload = [
//         '000201', // Payload Format Indicator
//         '26', // Merchant Account Information
//         '0014br.gov.bcb.pix', // GUI
//         `01${chave.length.toString().padStart(2, '0')}${chave}`, // Chave PIX (e-mail)
//         `02${nome.length.toString().padStart(2, '0')}${nome}`, // Nome Recebedor
//         `03${cidade.length.toString().padStart(2, '0')}${cidade}`, // Cidade Recebedor
//         '52040000', // Merchant Category Code
//         '5303986', // Transaction Currency (986 - BRL)
//         `54${(valor * 100).toFixed(0).toString().padStart(12, '0')}`, // Transaction Amount (em centavos)
//         '5802BR', // Country Code
//         `59${nome.length.toString().padStart(2, '0')}${nome}`, // Nome Recebedor
//         `60${cidade.length.toString().padStart(2, '0')}${cidade}`, // Cidade Recebedor
//     ].join('');

//     // Calcular CRC16 e adicionar ao payload
//     const crcValue = calculateCRC16(payload);
//     return `${payload}${crcValue}`;
// }

// // Dados fornecidos
// const chavePix = 'mercia.andressa@yahoo.com.br'; // Chave PIX (e-mail)
// const nomeRecebedor = 'Mercia Andressa';
// const cidadeRecebedor = 'Fortaleza';
// const valor = 300.00; // Valor do PIX

// // Gerar o código PIX
// const pixCode = createPixCode(chavePix, nomeRecebedor, cidadeRecebedor, valor);

// // Gerar o QR Code
// QRCode.toFile('pix-qrcode.png', pixCode, {
//     color: {
//         dark: '#000',  // Cor do QR Code
//         light: '#FFF'  // Cor do fundo
//     }
// }, function (err) {
//     if (err) throw err;
//     console.log('QR Code gerado com sucesso!');
// });






// import crcmode
// import qrcode


// class Payload(): 
//     def _init_(self, nome, chavepix, valor, cidade, txtId):

//         self.nome = nome
//         self.chavepix = chavepix
//         self.valor = valor
//         self.cidade = cidade
//         self.txtId = txtId

//         self.nome_tam = len(self.nome)
//         self.chavepix_tam =  len(self.chavepix)
//         self.valor_tam =  len(valor)
//         self.cidade_tam = len(cidade)
//         self.tstId_tam = len(txtId)

//         self.merchantAccount_tam = f'0014BR.GOV.BCB.PIX01{self.chavepix_tam}{self.chavepix}'


//         self.payloadFormat = '000201'
//         self.merchantAccount = f'26'{len(self.merchantAccount_tam)}{self.merchantAccount_tam}

//         if self.valor_tam <= 9:
//             self.transactionAmount_tam = f'0{self.valor_tam}{self.valor}'
//         else:
//         self.transactionAmount_tam = f'{self.valor_tam}{self.valor}'

//         if self.txtId_tam <= 9:
//             self.addDataField_tam = f'050{self.txtId_tam}{self.txtId}'
//         else:
//         self.addDataField_tam = f'05{self.txtId_tam}{self.txtId}'

//         if self.nome_tam <= 9:
//             self.nome_tam = f'0{self.nome_tam}'
        
//         if self.cidade_tam <= 9:
//             self.cidade_tam = f'0{self.cidade_tam}'  



//         self.merchantCategCode = '52040000'
//         self.transactionCurrency = '5303986'
//         self.transactionAmount = f'54 {self.transactionAmount_tam}'
//         self.countryCode = '5802BR'
//         self.merchantName = f'59 {self.nome_tam}{self.nome}'
//         self.merchantCity = f'60 {self.cidade_tam}{self.cidade}'
//         self.addDataField = f'62 {len(self.addDataField_tam)}{self.addDataField}'
//         self.crc16 = '6304'


//     def gerarPayload(self):
//         self.payload = f'{self.payloadFormat}{self.merchantAccount}{self.merchantCategCode}{self.transactionCurrency}{self.transactionAmount}{self.countryCode}{self.merchantName}{self.merchantCity}{self.addDataField}{self.crc16}'

//         print()
//         print(self.payload)
//         print()

//         self.gerarCrc16(self.payload)

//     def gerarCrc16(self.payload):
//         crc16 = crcmode.mkCrcFun(poly=0x11021, initCrc=0xFFFF, rev=False, xorOut=0x0000)

//         self.crc16code = hex(crc16(str(payload).encode(utf-8)))

//         self.crc16code_formatado = str(self.crc16code).replace('0x','').upper()

//         self.payload_completa = f'{payload}{self.crc16code_formatado}'

//         print()
//         print(self.payload_completa)
//         print()
        
//     def print_variaveis(self):
//         print(len(self.merchantAccount_tam))


// if _name_ == '_main_':
//     p = Payload('nome', 'mercia.andressa@yahoo.com.br', '1.00','fortal', 'loja01')
//     p.gerarPayload()

const crc = require('crc');
const QRCode = require('qrcode');

class Payload {
    constructor(nome, chavepix, valor, cidade, txtId) {
        this.nome = nome;
        this.chavepix = chavepix; // Não remover formatação para email
        this.valor = this.formatarValor(valor); // Formatar o valor para o padrão Pix

        this.cidade = cidade;
        this.txtId = txtId;

        this.nome_tam = this.nome.length;
        this.chavepix_tam = this.chavepix.length;
        this.valor_tam = this.valor.length;
        this.cidade_tam = this.cidade.length;
        this.txtId_tam = this.txtId.length;

        this.merchantAccount_tam = `0014BR.GOV.BCB.PIX01${this.chavepix_tam}${this.chavepix}`;

        this.payloadFormat = '000201';
        this.merchantAccount = `26${this.merchantAccount_tam.length}${this.merchantAccount_tam}`;

        // Corrigir a formatação do valor
        this.transactionAmount_tam = this.valor_tam <= 9 ? `0${this.valor_tam}${this.valor}` : `${this.valor_tam}${this.valor}`;

        this.addDataField_tam = this.txtId_tam <= 9 ? `050${this.txtId_tam}${this.txtId}` : `05${this.txtId_tam}${this.txtId}`;

        this.nome_tam = this.nome_tam <= 9 ? `0${this.nome_tam}` : `${this.nome_tam}`;
        this.cidade_tam = this.cidade_tam <= 9 ? `0${this.cidade_tam}` : `${this.cidade_tam}`;

        this.merchantCategCode = '52040000';
        this.transactionCurrency = '5303986';
        this.transactionAmount = `54${this.transactionAmount_tam}`;
        this.countryCode = '5802BR';
        this.merchantName = `59${this.nome_tam}${this.nome}`;
        this.merchantCity = `60${this.cidade_tam}${this.cidade}`;
        this.addDataField = `62${this.addDataField_tam.length}${this.addDataField_tam}`;
        this.crc16 = '6304';
    }

    formatarValor(valor) {
        // Converter o valor para string com duas casas decimais
        return valor.toFixed(2);
    }

    gerarPayload() {
        let payload = `${this.payloadFormat}${this.merchantAccount}${this.merchantCategCode}${this.transactionCurrency}${this.transactionAmount}${this.countryCode}${this.merchantName}${this.merchantCity}${this.addDataField}${this.crc16}`;

        console.log();
        console.log(`Payload: ${payload}`);
        console.log();

        this.gerarCrc16(payload);
    }

    gerarCrc16(payload) {
        // Calcular CRC16-CCITT
        let crc16code = crc.crc16ccitt(payload);
        let crc16code_formatado = crc16code.toString(16).toUpperCase().padStart(4, '0');
        let payload_completa = `${payload}${crc16code_formatado}`;

        console.log();
        console.log(`Payload Completa com CRC16: ${payload_completa}`);
        console.log();

        
        QRCode.toFile('pix-qrcode.png', payload_completa, {
            color: {
                dark: '#000', 
                light: '#FFF'  
            }
        }, function (err) {
            if (err) throw err;
            console.log('QR Code gerado com sucesso!');
        });
    }
}


const p = new Payload('Nome', 'mercia.andressa@yahoo.com.br', 300.00, 'Fortaleza', 'Loja01');
p.gerarPayload();



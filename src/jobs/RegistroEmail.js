const nodemailer = require('nodemailer');
const EmailTransport = require('../config/EmailTransport')

async function sendMail (quantidadeProdutos, nomeProdutos) {
    let transport = nodemailer.createTransport(EmailTransport);

    const separador = '\n\n==============================================================\n\n'
    let message = await transport.sendMail({
        from: '"Leonardo Campos Muniz" <leonardo.muniz@codeby.com>',
        to: "teste@teste.com",
        subject: "Email com Nodemailer",
        text: `Olá Senhor(a) !! Aqui está o resultado de pesquisa sobre produtos da API VTEX ${separador}Segundo nossas pesquisas a quantidade de produtos disponíveis na loja é: ${quantidadeProdutos}${separador}Segue a baixo alguns produtos desta lista: \n${nomeProdutos}`,
        //html: `Olá ! <br>me chamo Midoria <br>E sou um Programador`
    });
};

module.exports = sendMail;
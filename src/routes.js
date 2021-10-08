const express = require('express');
const Queue = require('bull/lib/queue');
const axios = require('axios');

const api = require('./services/Api');
const redisConfig = require('./config/Redis');
const RegistroEmailJob = require('./jobs/RegistroEmail');

const router = express.Router();

const EnvioRelatorioQueue = new Queue('Envio de relatório', redisConfig);


router.get('/sendmail', async (req, res) => {
    try {
        const { data, headers } = await axios.get(api.url, { headers: api.headers })
            .catch(error => console.log(error));

        const paginaProdutos = headers.resources;
        const infoProdutos = {
            totalProdutos: paginaProdutos.split('/')[1],
            nomeProdutos: data.map(produto => `\n • Produto: ${produto.productName}`)
        }

        EnvioRelatorioQueue.add(infoProdutos);
        console.log("E-mail enviado com sucesso !");

        return res.sendStatus(200);
    } catch (error) {
        return console.log(error);
    };
});


EnvioRelatorioQueue.process(async job => {
    const infos = job.data
    //console.log(infos)
    RegistroEmailJob(infos.totalProdutos, infos.nomeProdutos);
});


module.exports = router;
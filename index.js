import express from 'express';
const app = express();

import {RetornaIpca, RetornaIpcaMedia} from './logica/logica.js';
import historicoInflacao from './dados/dados.js';


//app.get('/', (req, res) =>{
    //let n1 = parseInt(req.query.n1);
    //let n2 = parseInt(req.query.n2);
    //let total = n1 + n2;
    //res.json({soma: total});
   
    //});
    app.get('/', (req, res) =>{
        res.json(historicoInflacao);
    });
    app.get('/ipca', (req, res) =>{
        let ano = parseInt(req.query.ano);
        let mes = parseInt(req.query.mes);
        
        let IPCA = RetornaIpca(ano, mes);
        if(IPCA){
            res.json(IPCA)
        }else{
            res.status(404).json({"erro": "Ipca não encontrado"})
        }
    });
    app.get('/ipca/ipca', (req, res) =>{
    
        let Ano_inicial = parseInt(req.query.Ano_inicial);
        let Ano_final = parseInt(req.query.Ano_final);
        let Mes_inicial = parseInt(req.query.Mes_inicial);
        let Mes_final = parseInt(req.query.Mes_final);
        let Valor = parseInt(req.query.Valor);

        let IPCA_MEDIA = RetornaIpcaMedia(Ano_inicial, Ano_final, Mes_inicial, Mes_final, Valor);
        if(IPCA_MEDIA){
            res.json({"Ipca": IPCA_MEDIA.toFixed(2)});
        }else{
            res.status(404).json({"erro": "Ipca não encontrado ou erro de digitação"});
        }
    });
    app.listen(8080, () =>{
    console.log("Servidor iniciado");
});

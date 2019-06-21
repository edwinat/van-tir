var express = require('express');
var PORT = process.env.PORT || 5000;
var app = express();
const path = require('path');
const bodyParser = require('body-parser');
let Calculadora = require('./calculadora');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
const calculadora = new Calculadora();


async function pagina_principal(req, res) {
    res.render("index");
}

async function calcular(req, res) {
    const datos_flujo_neto = {
        ingreso: parseFloat( req.body.ingreso),
        porcentaje_incremento:parseFloat( req.body.porcentaje_incremento),
        costo_produccion: parseFloat(req.body.costo_produccion),
        costo_administraccion: parseFloat(req.body.costo_administraccion),
        costo_mantenimiento: parseFloat(req.body.costo_mantenimiento),
        depreciacion: parseFloat(req.body.depreciacion),
        impuesto: parseFloat(req.body.impuesto),
        anios: parseInt(req.body.anios)
    };
    const datos_VAN = {
        inversion_inicial: parseFloat(req.body.inversion_inicial),
        TMAR: parseFloat(req.body.TMAR),
        valor_salvamento: parseFloat(req.body.valor_salvamento)
    };

    let flujo_neto_efectivo = calculadora.calcular_flujo_neto(datos_flujo_neto);
    let VAN = calculadora.calcular_VAN(datos_VAN,flujo_neto_efectivo);
    let TIR = calculadora.calcular_TIR(datos_VAN,flujo_neto_efectivo);
    respuesta={
        lista:flujo_neto_efectivo,
        VAN:VAN,
        TIR:TIR
    }
    res.render('mostrar',respuesta);
}

app.get('/', pagina_principal);
app.post('/calcular', calcular);


app.listen(PORT, function () {
    console.log('Esta corriendo la app');
});

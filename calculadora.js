class Calculadora {
    constructor() { }
    calcular_flujo_neto(datos) {
        let flujo_neto = [];
        let ingreso = datos.ingreso;
        let porcentaje_incremento = datos.porcentaje_incremento;
        let costo_produccion = datos.costo_produccion;
        let costo_administraccion = datos.costo_administraccion;
        let costo_mantenimiento = datos.costo_mantenimiento;
        let depreciacion = datos.depreciacion;
        let impuesto = datos.impuesto;
        let utilidad = 0;
        for (let index = 0; index < datos.anios; index++) {
            utilidad = ingreso - costo_produccion - costo_administraccion - costo_mantenimiento - depreciacion;
            utilidad = utilidad - (utilidad * impuesto);
            utilidad = utilidad + depreciacion;

            flujo_neto.push(utilidad);
            ingreso = ingreso + (ingreso * porcentaje_incremento);
        }
        return flujo_neto;
    }

    calcular_VAN(datos, lista_flujo_neto_efectivo) {
        let inversion_inicial = datos.inversion_inicial;
        let TMAR = datos.TMAR;
        let valor_salvamento = datos.valor_salvamento;

        return this.calcular_sumatoria(lista_flujo_neto_efectivo, TMAR, valor_salvamento) - inversion_inicial;
    }

    calcular_TIR(datos, lista_flujo_neto_efectivo) {
        let van = 1;
        
        while (0 < van) {
            datos.TMAR = datos.TMAR + 0.01;
            van = this.calcular_VAN(datos, lista_flujo_neto_efectivo);
        }
        return datos.TMAR;
    }

    calcular_sumatoria(lista_flujo_neto_efectivo, TMAR, valor_salvamento) {
        let total_sumatoria = 0;
        for (let i = 0; i < lista_flujo_neto_efectivo.length; i++) {
            if (i + 1 === lista_flujo_neto_efectivo.length) {
                total_sumatoria = total_sumatoria + this.calcular_i_sumatoria(lista_flujo_neto_efectivo[i], TMAR, i + 1, valor_salvamento);
            }
            else {
                total_sumatoria = total_sumatoria + this.calcular_i_sumatoria(lista_flujo_neto_efectivo[i], TMAR, i + 1, 0);
            }
        }
        return total_sumatoria;
    }
    calcular_i_sumatoria(flujo_neto_efectivo, TMAR, i, valor_salvamento) {
        let numerador = flujo_neto_efectivo - valor_salvamento;
        let denominador = Math.pow(1 + TMAR, i);
        return numerador / denominador;
    }

}

module.exports = Calculadora;




public abstract class Financiamento {
    private double valorTotal;
    private int quantidadeParcelas;
    private int parcelasPagas;

    public Financiamento(double valorTotal, int quantidadeParcelas) {
        this.valorTotal = valorTotal;
        this.quantidadeParcelas = quantidadeParcelas;
        this.parcelasPagas = 0;
    }

    public abstract double calcularValorFinanciamento();

    public double calcularValorParcela() {
        return calcularValorFinanciamento() / quantidadeParcelas;
    }

    public void pagarParcela(double valor) throws Exception {
        if (valor != calcularValorParcela()) {
            throw new Exception("Valor da parcela incorreto.");
        }
        if (parcelasPagas >= quantidadeParcelas) {
            throw new Exception("Todas as parcelas já foram pagas.");
        }
        parcelasPagas++;
    }

    public double calcularValorPago() {
        return parcelasPagas * calcularValorParcela();
    }

    public double calcularValorAPagar() {
        return calcularValorFinanciamento() - calcularValorPago();
    }
}
public class FinanciamentoPF extends Financiamento {
    private double valorVeiculo;

    public FinanciamentoPF(double valorVeiculo, int quantidadeParcelas) {
        super(valorVeiculo * 1.2, quantidadeParcelas);
        this.valorVeiculo = valorVeiculo;
    }

    @Override
    public double calcularValorFinanciamento() {
        return valorVeiculo * 1.2;
    }
}

public class FinanciamentoPJ extends Financiamento {
    private double valorVeiculo;
    private double juros;

    public FinanciamentoPJ(double valorVeiculo, double juros, int quantidadeParcelas) {
        super(valorVeiculo * (1 + juros), quantidadeParcelas);
        this.valorVeiculo = valorVeiculo;
        this.juros = juros;
    }

    @Override
    public double calcularValorFinanciamento() {
        return valorVeiculo * (1 + juros);
    }
}

import java.util.ArrayList;
import java.util.List;

public class Concessionaria {
    private List<Financiamento> financiamentos;

    public Concessionaria() {
        this.financiamentos = new ArrayList<>();
    }

    public void financiarVeiculoPF(double valorVeiculo, int parcelas) throws Exception {
        if (parcelas <= 0 || parcelas > 600) {
            throw new Exception("Número de parcelas inválido.");
        }
        Financiamento financiamento = new FinanciamentoPF(valorVeiculo, parcelas);
        financiamentos.add(financiamento);
    }

    public void financiarVeiculoPJ(double valorVeiculo, double juros, int parcelas) throws Exception {
        if (parcelas <= 0 || parcelas > 600) {
            throw new Exception("Número de parcelas inválido.");
        }
        Financiamento financiamento = new FinanciamentoPJ(valorVeiculo, juros, parcelas);
        financiamentos.add(financiamento);
    }

    public double calcularValorTotalPago() {
        double total = 0;
        for (Financiamento f : financiamentos) {
            total += f.calcularValorPago();
        }
        return total;
    }

    public double calcularValorTotalAPagar() {
        double total = 0;
        for (Financiamento f : financiamentos) {
            total += f.calcularValorAPagar();
        }
        return total;
    }
}

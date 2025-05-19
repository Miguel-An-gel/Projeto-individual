# Projeto-individual

public abstract class Financiamento {
    private Double valorTotal;
    private Integer quantidadeParcelas;
    private Integer parcelasPagas;

    public Financiamento(Double valorTotal, Integer quantidadeParcelas) {
        this.valorTotal = valorTotal;
        this.quantidadeParcelas = quantidadeParcelas;
        this.parcelasPagas = 0;
    }

    public abstract Double calcularValorFinanciamento();

    public Double calcularValorParcela() {
        return calcularValorFinanciamento() / quantidadeParcelas;
    }

    public void pagarParcela(Double valor) throws PagamentoInvalidoException {
        if (valor == null || !valor.equals(calcularValorParcela())) {
            throw new PagamentoInvalidoException("Valor da parcela inválido.");
        }
        if (parcelasPagas >= quantidadeParcelas) {
            throw new PagamentoInvalidoException("Financiamento já quitado.");
        }
        parcelasPagas++;
    }

    public Double calcularValorPago() {
        return parcelasPagas * calcularValorParcela();
    }

    public Double calcularValorAPagar() {
        return calcularValorFinanciamento() - calcularValorPago();
    }

    // Getters e Setters
}


Concessionária 


import java.util.ArrayList;
import java.util.List;

public class Concessionaria {
    private List<Financiamento> financiamentos;

    public Concessionaria() {
        this.financiamentos = new ArrayList<>();
    }

    public void financiarVeiculo(Pessoa pessoa, Veiculo veiculo, Integer parcelas) throws Exception {
        if (pessoa == null || veiculo == null || parcelas == null) {
            throw new ValorInexistenteException("Pessoa, veículo ou parcelas não podem ser nulos.");
        }
        if (parcelas <= 0 || parcelas > 600) {
            throw new RequisicaoDeFinanciamentoInvalidaException("Número de parcelas inválido.");
        }
        if (pessoa.getCpf() == null || pessoa.getCpf().trim().length() != 11) {
            throw new DocumentoInvalidoException("CPF inválido.");
        }
        Financiamento financiamento = new FinanciamentoPF(veiculo, parcelas);
        financiamentos.add(financiamento);
    }

    public void financiarVeiculo(Empresa empresa, Veiculo veiculo, Integer parcelas) throws Exception {
        if (empresa == null || veiculo == null || parcelas == null) {
            throw new ValorInexistenteException("Empresa, veículo ou parcelas não podem ser nulos.");
        }
        if (parcelas <= 0 || parcelas > 600) {
            throw new RequisicaoDeFinanciamentoInvalidaException("Número de parcelas inválido.");
        }
        if (empresa.getCnpj() == null || empresa.getCnpj().trim().length() != 14) {
            throw new DocumentoInvalidoException("CNPJ inválido.");
        }
        Financiamento financiamento = new FinanciamentoPJ(veiculo, empresa.getTipoEmpresa(), parcelas);
        financiamentos.add(financiamento);
    }

    public List<Financiamento> buscarPorCpf(String cpf) {
        List<Financiamento> resultados = new ArrayList<>();
        for (Financiamento financiamento : financiamentos) {
            if (financiamento instanceof FinanciamentoPF) {
                if (((FinanciamentoPF) financiamento).getPessoa().getCpf().equals(cpf)) {
                    resultados.add(financiamento);
                }
            }
        }
        return resultados;
    }

    public Double totalValorPago() {
        return financiamentos.stream().mapToDouble(Financiamento::calcularValorPago).sum();
    }

    public Double totalValorAPagar() {
        return financiamentos.stream().mapToDouble(Financiamento::calcularValorAPagar).sum();
    }
}

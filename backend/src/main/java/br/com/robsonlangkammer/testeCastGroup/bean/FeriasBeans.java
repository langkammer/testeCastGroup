package br.com.robsonlangkammer.testeCastGroup.bean;

import br.com.robsonlangkammer.testeCastGroup.model.FuncionarioModel;

import java.util.Date;

public class FeriasBeans {

    private FuncionarioModel funcionario;

    private Date dataLimiteFerias;

    private Integer anosFaltantes;

    private Integer mesFaltantes;

    public FuncionarioModel getFuncionario() {
        return funcionario;
    }

    public void setFuncionario(FuncionarioModel funcionario) {
        this.funcionario = funcionario;
    }

    public Date getDataLimiteFerias() {
        return dataLimiteFerias;
    }

    public void setDataLimiteFerias(Date dataLimiteFerias) {
        this.dataLimiteFerias = dataLimiteFerias;
    }

    public Integer getAnosFaltantes() {
        return anosFaltantes;
    }

    public void setAnosFaltantes(Integer anosFaltantes) {
        this.anosFaltantes = anosFaltantes;
    }

    public Integer getMesFaltantes() {
        return mesFaltantes;
    }

    public void setMesFaltantes(Integer mesFaltantes) {
        this.mesFaltantes = mesFaltantes;
    }
}

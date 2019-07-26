package br.com.robsonlangkammer.testeCastGroup.bean;

import br.com.robsonlangkammer.testeCastGroup.model.FeriasModel;

public class FeriasConsulta {

    private boolean ok;

    private String msg;

    private FeriasModel feriasModel;

    public FeriasModel getFeriasModel() {
        return feriasModel;
    }

    public void setFeriasModel(FeriasModel feriasModel) {
        this.feriasModel = feriasModel;
    }

    public boolean isOk() {
        return ok;
    }

    public void setOk(boolean ok) {
        this.ok = ok;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}

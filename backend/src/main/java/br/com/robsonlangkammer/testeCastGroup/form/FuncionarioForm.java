package br.com.robsonlangkammer.testeCastGroup.form;

import br.com.robsonlangkammer.testeCastGroup.model.FuncionarioModel;
import org.springframework.web.multipart.MultipartFile;

public class FuncionarioForm {
    private MultipartFile image;
    private FuncionarioModel funcionario;

    public MultipartFile getImage() {
        return image;
    }

    public void setImage(MultipartFile image) {
        this.image = image;
    }

    public FuncionarioModel getFuncionario() {
        return funcionario;
    }

    public void setFuncionario(FuncionarioModel funcionario) {
        this.funcionario = funcionario;
    }
}

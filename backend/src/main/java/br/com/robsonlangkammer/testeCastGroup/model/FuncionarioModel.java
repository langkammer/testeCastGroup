package br.com.robsonlangkammer.testeCastGroup.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import java.util.Date;

@Entity
public class FuncionarioModel {

    @Id
    @GeneratedValue
    private Long id;

    private Long matricula;

    private String nome;

    private Date dataNascimento;

    @OneToOne
    private EnderecoModel endereco;

    private Date dataAdmissao;

    private String foto;

    @OneToOne
    private EquipeModel equipe;

}

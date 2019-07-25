package br.com.robsonlangkammer.testeCastGroup.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class EnderecoModel {

    @Id
    @GeneratedValue
    private Long id;

    private String rua;

    private String numero;

    private String complemento;

    private String bairro;

    private String cidade;

    private String estado;


}

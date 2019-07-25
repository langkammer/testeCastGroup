package br.com.robsonlangkammer.testeCastGroup.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class EquipeModel {

    @Id
    @GeneratedValue
    private Long id;

    private String nome;

    private Date data;

}

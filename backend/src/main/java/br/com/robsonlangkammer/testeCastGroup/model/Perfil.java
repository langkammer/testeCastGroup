package br.com.robsonlangkammer.testeCastGroup.model;

import org.springframework.security.core.GrantedAuthority;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Perfil implements GrantedAuthority {

    @Id
    @GeneratedValue
    private Long id;

    private String nome;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    @Override
    public String getAuthority() {
        return this.nome;
    }
}

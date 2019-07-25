package br.com.robsonlangkammer.testeCastGroup.dto;

public class TokenDto {
    private String token;
    private String tipo;

    public TokenDto(String token, String tipo) {
        this.tipo= tipo;
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
}

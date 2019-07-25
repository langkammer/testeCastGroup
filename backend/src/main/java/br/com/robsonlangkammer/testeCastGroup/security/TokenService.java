package br.com.robsonlangkammer.testeCastGroup.security;

import br.com.robsonlangkammer.testeCastGroup.model.UserModel;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class TokenService {

    @Value("${api.jwt.expiration}")
    private String expiration;

    @Value("${api.jwt.secret}")
    private String secret;

    public String gerarToken(Authentication authentication) {
        UserModel login = (UserModel) authentication.getPrincipal();
        Date hoje = new Date();
        Date expiration = new Date(hoje.getTime() + Long.parseLong(this.expiration));
        return Jwts.builder()
                .setIssuer("Api")
                .setSubject(login.getId().toString())
                .setIssuedAt(hoje)
                .setExpiration(expiration)
                .signWith(SignatureAlgorithm.HS256,this.secret)
                .compact();
    }

    public boolean isTokenValid(String token) {
        try {
            Jwts.parser()
                    .setSigningKey(this.secret)
                    .parseClaimsJws(token);

            return  true;
        }
        catch (Exception e ){
            return false;
        }


    }

    public Long getIdUser(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(this.secret)
                .parseClaimsJws(token).getBody();

        return  Long.parseLong(claims.getSubject());
    }
}

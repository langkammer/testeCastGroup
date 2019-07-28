package br.com.robsonlangkammer.testeCastGroup.controller;

import br.com.robsonlangkammer.testeCastGroup.bean.EvenlopResponse;
import br.com.robsonlangkammer.testeCastGroup.security.TokenService;
import br.com.robsonlangkammer.testeCastGroup.dto.TokenDto;
import br.com.robsonlangkammer.testeCastGroup.form.LoginForm;
import br.com.robsonlangkammer.testeCastGroup.util.ResponseFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController extends ResponseFactory {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService token;

    @PostMapping
    public EvenlopResponse sigin(@RequestBody @Valid LoginForm form){
        UsernamePasswordAuthenticationToken formLogin = form.convert();
        try{
            Authentication authentication = authenticationManager.authenticate(formLogin);

            String token = this.token.gerarToken(authentication);

            return returnEnvelopSucesso(new TokenDto(token,"Bearer"),"Logado com Sucesso");

        }
        catch (AuthenticationException e){
            return returnEnvelopError(ResponseEntity.badRequest().build() + " Erro ao Logar " + e.getCause());

        }


    }




}

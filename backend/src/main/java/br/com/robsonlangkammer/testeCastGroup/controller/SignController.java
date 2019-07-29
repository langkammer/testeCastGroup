package br.com.robsonlangkammer.testeCastGroup.controller;

import br.com.robsonlangkammer.testeCastGroup.bean.EvenlopResponse;
import br.com.robsonlangkammer.testeCastGroup.dto.TokenDto;
import br.com.robsonlangkammer.testeCastGroup.form.LoginForm;
import br.com.robsonlangkammer.testeCastGroup.form.UsuarioForm;
import br.com.robsonlangkammer.testeCastGroup.model.UserModel;
import br.com.robsonlangkammer.testeCastGroup.repository.UsuarioRepository;
import br.com.robsonlangkammer.testeCastGroup.security.TokenService;
import br.com.robsonlangkammer.testeCastGroup.services.UserService;
import br.com.robsonlangkammer.testeCastGroup.util.ResponseFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;


@RestController
@CrossOrigin("*")
@RequestMapping("/sign")
public class SignController extends ResponseFactory {

    @Autowired
    private UsuarioRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService token;

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<TokenDto> sigin(@RequestBody UsuarioForm userForm){
        try{
            UserModel u = this.userService.criaLogin(userForm);

            if(u!=null){
                LoginForm form = new LoginForm();

                form.setPass(userForm.getPass());
                form.setEmail(userForm.getEmail());

                UsernamePasswordAuthenticationToken formLogin = form.convert();

                Authentication authentication = authenticationManager.authenticate(formLogin);

                String token = this.token.gerarToken(authentication);

                return ResponseEntity.ok(new TokenDto(token,"Bearer"));
            }

            return ResponseEntity.badRequest().build();


        }
        catch (AuthenticationException e){
            return ResponseEntity.badRequest().build();
        }


    }


    @GetMapping
    public EvenlopResponse get(
            @RequestParam(value = "idUser", required = true, defaultValue = "") Long idUser){
        try{
            Optional<UserModel> u = userRepository.findById(idUser);

            if(u.isPresent()){


                return returnEnvelopSucesso(u,"Dado ok");
            }

            return returnEnvelopError("Error ....");


        }
        catch (Exception e){
            return returnEnvelopError("Error ....");
        }


    }


}

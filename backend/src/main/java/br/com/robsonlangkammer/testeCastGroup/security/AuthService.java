package br.com.robsonlangkammer.testeCastGroup.security;

import br.com.robsonlangkammer.testeCastGroup.model.UserModel;
import br.com.robsonlangkammer.testeCastGroup.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService  implements UserDetailsService {


    @Autowired
    UsuarioRepository repository;


    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        Optional<UserModel> u = repository.findByEmail(s);

        if(u.isPresent())
            return u.get();

        throw  new UsernameNotFoundException("Usuario ou senha Localizado!");
    }
}

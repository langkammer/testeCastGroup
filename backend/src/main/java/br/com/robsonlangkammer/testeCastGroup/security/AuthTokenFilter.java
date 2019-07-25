package br.com.robsonlangkammer.testeCastGroup.security;

import br.com.robsonlangkammer.testeCastGroup.model.UserModel;
import br.com.robsonlangkammer.testeCastGroup.repository.UsuarioRepository;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


public class AuthTokenFilter extends OncePerRequestFilter {

    private TokenService tokenService;

    private UsuarioRepository usuarioRepository;

    public AuthTokenFilter(TokenService tokenService,UsuarioRepository usuarioRepository) {
        this.tokenService = tokenService;
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String token = getToken(request);

        boolean valid = tokenService.isTokenValid(token);

        if(valid)
            authUser(token);


        filterChain.doFilter(request,response);
    }

    private void authUser(String token){
        Long idUser = tokenService.getIdUser(token);
        UserModel user = usuarioRepository.findById(idUser).get();
        UsernamePasswordAuthenticationToken  authentication = new UsernamePasswordAuthenticationToken(user,null,user.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    private String getToken(HttpServletRequest request) {
        String token =  request.getHeader("Authorization");

        boolean valid = tokenService.isTokenValid(token);

        if(token == null || token.isEmpty() || !token.startsWith("Bearer "))
            return null;
        else
            return token.substring(7,token.length());

    }
}

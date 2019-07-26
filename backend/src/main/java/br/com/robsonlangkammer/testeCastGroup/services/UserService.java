package br.com.robsonlangkammer.testeCastGroup.services;

import br.com.robsonlangkammer.testeCastGroup.bean.ResultResponseList;
import br.com.robsonlangkammer.testeCastGroup.form.UsuarioForm;
import br.com.robsonlangkammer.testeCastGroup.model.EquipeModel;
import br.com.robsonlangkammer.testeCastGroup.model.Perfil;
import br.com.robsonlangkammer.testeCastGroup.model.UserModel;
import br.com.robsonlangkammer.testeCastGroup.repository.PerfilRepository;
import br.com.robsonlangkammer.testeCastGroup.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {


    @Autowired
    UsuarioRepository userRepository;

    @Autowired
    PerfilRepository perfilRepository;

    public ResultResponseList search(Pageable paginacao, String campo) {

        ResultResponseList resultResponseList = new ResultResponseList();

        Page<UserModel> listPage = userRepository.findByNome(campo, paginacao);

        if(campo.isEmpty()){
            resultResponseList.setTotalElements(userRepository.count());
            resultResponseList.setTotalPages(listPage.getTotalPages());
        }
        else{
            resultResponseList.setTotalElements(listPage.getTotalElements());
            resultResponseList.setTotalPages(listPage.getTotalPages());

        }

        if(listPage.getContent()!=null)
            resultResponseList.setData((List<Object>) (List) listPage.getContent());
        else
            resultResponseList.setData(null);

        return resultResponseList;
    }

    public UserModel criaLogin(UsuarioForm usuarioForm){

        UserModel u = new UserModel();

        u.setEmail(usuarioForm.getEmail());
        u.setNome(usuarioForm.getNome());
        u.setPass(new BCryptPasswordEncoder().encode(usuarioForm.getPass()));
        Optional<Perfil> p = perfilRepository.findByNome("FUNCIONARIO");
        List<Perfil> perfils = new ArrayList<Perfil>();
        if(p.isPresent()){
            perfils.add(p.get());
        }
        else{
            Perfil perfilNovo = new Perfil();
            perfilNovo.setNome("FUNCIONARIO");
            perfilRepository.save(perfilNovo);
            perfils.add(perfilNovo);
        }
        u.setPerfil(perfils);

        return  userRepository.saveAndFlush(u);

    }



    public ResultResponseList searchFeriasVencendo(Pageable paginacao, String campo) {

        ResultResponseList resultResponseList = new ResultResponseList();

        Page<UserModel> listPage = userRepository.findByNome(campo, paginacao);

        if(campo.isEmpty()){
            resultResponseList.setTotalElements(userRepository.count());
            resultResponseList.setTotalPages(listPage.getTotalPages());
        }
        else{
            resultResponseList.setTotalElements(listPage.getTotalElements());
            resultResponseList.setTotalPages(listPage.getTotalPages());

        }

        if(listPage.getContent()!=null)
            resultResponseList.setData((List<Object>) (List) listPage.getContent());
        else
            resultResponseList.setData(null);

        return resultResponseList;
    }


}

package br.com.robsonlangkammer.testeCastGroup.controller;


import br.com.robsonlangkammer.testeCastGroup.bean.EvenlopResponse;
import br.com.robsonlangkammer.testeCastGroup.bean.ResultResponseList;
import br.com.robsonlangkammer.testeCastGroup.model.FuncionarioModel;
import br.com.robsonlangkammer.testeCastGroup.repository.FuncionarioRepository;
import br.com.robsonlangkammer.testeCastGroup.services.EquipeService;
import br.com.robsonlangkammer.testeCastGroup.util.ResponseFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/funcionario")
public class FuncionarioController extends ResponseFactory {

    @Autowired
    EquipeService service;

    @Autowired
    FuncionarioRepository repository;


    @GetMapping
    public EvenlopResponse list(
            @RequestParam(value = "nome", required = false, defaultValue = "") String nome,
            @PageableDefault(sort = "id",direction = Sort.Direction.DESC, page = 0,size = 10) Pageable paginacao){
        try{

            ResultResponseList r = service.search(paginacao,nome);

            return returnEnvelopSucessoList(r.getData(),r.getTotalPages(),r.getTotalElements(),"Operação Realizada com Sucesso");
        }
        catch (Exception e){
            return returnEnvelopError("Erro ao realizar a Operaçãp " + e.getMessage());

        }
    }

    @PostMapping
    public EvenlopResponse create(@RequestBody FuncionarioModel funcionario){
        try{
            return  returnEnvelopSucesso(repository.save(funcionario),"Operação Realizada com Sucesso");
        }catch (Exception e){
            return returnEnvelopError("Não Foi criar Equipe");
        }
    }

    @PutMapping
    public EvenlopResponse update(@PathVariable Long id, @RequestBody FuncionarioModel funcionario) {
        try{
            Optional<FuncionarioModel> optional = repository.findById(id);
            if (optional.isPresent())
                return returnEnvelopSucesso(repository.save(funcionario),"Dado salvo com Sucesso!");
            else
                return returnEnvelopError("Não Foi localizado dado");
        }
        catch (Exception e){
            return returnEnvelopError("Erro ao realizar a Operaçãp " + e.getMessage());

        }

    }

    @DeleteMapping("/{id}")
    public EvenlopResponse remover(@PathVariable Long id) {
        try{
            Optional<FuncionarioModel> optional = repository.findById(id);
            if (optional.isPresent()) {
                repository.deleteById(id);
                return returnEnvelopSucesso(null,"Dado deletado com Sucesso!");
            }
            else {
                return returnEnvelopSucesso(null,"Dado deletado  Não localizado");
            }
        }
        catch (Exception e){
            return returnEnvelopError("Erro ao realizar a Operaçãp " + e.getMessage());

        }


    }

}

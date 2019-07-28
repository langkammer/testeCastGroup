package br.com.robsonlangkammer.testeCastGroup.controller;

import br.com.robsonlangkammer.testeCastGroup.bean.EvenlopResponse;
import br.com.robsonlangkammer.testeCastGroup.bean.ResultResponseList;
import br.com.robsonlangkammer.testeCastGroup.model.EquipeModel;
import br.com.robsonlangkammer.testeCastGroup.repository.EquipeRepository;
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
@RequestMapping("/equipe")
public class EquipeController extends ResponseFactory {

    @Autowired
    EquipeService service;

    @Autowired
    EquipeRepository equipeRepository;


    @GetMapping(path = "/all")
    public EvenlopResponse all(){
        try{

            return returnEnvelopSucesso(equipeRepository.findAll(),"Operação Realizada com Sucesso");
        }
        catch (Exception e){
            return returnEnvelopError("Erro ao realizar a Operaçãp " + e.getMessage());

        }
    }
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
    public EvenlopResponse create(@RequestBody EquipeModel equipeModel){
        try{
            return  returnEnvelopSucesso(equipeRepository.save(equipeModel),"Equipe criada com Sucesso");
        }catch (Exception e){
            return returnEnvelopError("Não Foi criar Equipe");
        }
    }

    @PutMapping
    public EvenlopResponse update(@PathVariable Long id, @RequestBody EquipeModel equipeModel) {
        try{
            Optional<EquipeModel> optional = equipeRepository.findById(id);
            if (optional.isPresent())
                return returnEnvelopSucesso(equipeRepository.save(equipeModel),"Equipe Salva com Sucesso!");
            else
                return returnEnvelopError("Não Foi localizado Equipe");
        }
        catch (Exception e){
            return returnEnvelopError("Erro ao realizar a Operaçãp " + e.getMessage());

        }

    }

    @DeleteMapping("/{id}")
    public EvenlopResponse remover(@PathVariable Long id) {
        try{
            Optional<EquipeModel> optional = equipeRepository.findById(id);
            if (optional.isPresent()) {
                equipeRepository.deleteById(id);
                return returnEnvelopSucesso(null,"Equipe Deletada com Sucesso!");
            }
            else {
                return returnEnvelopSucesso(null,"Equipe Não localizada");
            }
        }
        catch (Exception e){
            return returnEnvelopError("Erro ao realizar a Operaçãp " + e.getMessage());

        }


    }

}

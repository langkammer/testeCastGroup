package br.com.robsonlangkammer.testeCastGroup.controller;


import br.com.robsonlangkammer.testeCastGroup.bean.EvenlopResponse;
import br.com.robsonlangkammer.testeCastGroup.bean.ResultResponseList;
import br.com.robsonlangkammer.testeCastGroup.model.FuncionarioModel;
import br.com.robsonlangkammer.testeCastGroup.repository.FuncionarioRepository;
import br.com.robsonlangkammer.testeCastGroup.services.FileStorageService;
import br.com.robsonlangkammer.testeCastGroup.services.FuncionarioService;
import br.com.robsonlangkammer.testeCastGroup.services.UserService;
import br.com.robsonlangkammer.testeCastGroup.util.ResponseFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/funcionario")
public class FuncionarioController extends ResponseFactory {

    @Autowired
    UserService service;

    @Autowired
    FuncionarioService funcionarioService;

    @Autowired
    FuncionarioRepository repository;

    @Autowired
    private FileStorageService fileStorageService;

//    @GetMapping(name = "/listByFeriasVencendo")
//    public EvenlopResponse listByFeriasVencendo(@RequestParam(value = "nome", required = false, defaultValue = "") String nome,
//                                                @PageableDefault(sort = "id",direction = Sort.Direction.DESC, page = 0,size = 10) Pageable paginacao){
//        try{
//            ResultResponseList r = service.searchFeriasVencendo(paginacao,nome);
//            return returnEnvelopSucessoList(r.getData(),r.getTotalPages(),r.getTotalElements(),"Operação Realizada com Sucesso");
//        }
//        catch (Exception e){
//            return returnEnvelopError("Erro ao realizar a Operaçãp " + e.getMessage());
//
//        }
//    }

    @GetMapping(path = "/getFoto/{fileName}")
    public ResponseEntity<Resource> getFile(@PathVariable String fileName){
        try{
            Resource file = fileStorageService.loadFileAsResource(fileName);
            return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                    "attachment; filename=\"" + file.getFilename() + "\"").body(file);
        }
        catch (Exception e){
            return null;
        }
    }
    @GetMapping
    public EvenlopResponse list(
            @RequestParam(value = "nome", required = false, defaultValue = "") String nome,
            @PageableDefault(sort = "id",direction = Sort.Direction.DESC, page = 0,size = 10) Pageable paginacao){
        try{

            ResultResponseList r = funcionarioService.search(paginacao,nome);

            return returnEnvelopSucessoList(r.getData(),r.getTotalPages(),r.getTotalElements(),"Operação Realizada com Sucesso");
        }
        catch (Exception e){
            return returnEnvelopError("Erro ao realizar a Operaçãp " + e.getMessage());

        }
    }


    @PostMapping
    public EvenlopResponse create(MultipartFile foto,String funcionarioStringJson){
        try{
            return  returnEnvelopSucesso(funcionarioService.criarFuncionario(foto,funcionarioStringJson),
                    "Operação Realizada com Sucesso");
        }catch (Exception e){
            return returnEnvelopError("Não Foi criar dado");
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

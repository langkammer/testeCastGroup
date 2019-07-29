package br.com.robsonlangkammer.testeCastGroup.services;

import br.com.robsonlangkammer.testeCastGroup.bean.ResultResponseList;
import br.com.robsonlangkammer.testeCastGroup.form.FuncionarioForm;
import br.com.robsonlangkammer.testeCastGroup.model.FuncionarioModel;
import br.com.robsonlangkammer.testeCastGroup.repository.FuncionarioRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;

@Service
public class FuncionarioService {

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    FuncionarioRepository repository;

    public ResultResponseList search(Pageable paginacao, String campo) {

        ResultResponseList resultResponseList = new ResultResponseList();

        Page<FuncionarioModel> listPage = repository.findByNomeContaining(campo, paginacao);

        if(campo.isEmpty()){
            resultResponseList.setTotalElements(repository.count());
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


    public FuncionarioModel criarFuncionario(MultipartFile foto,String funcString) throws Exception{

        if(!foto.isEmpty())
        {
            ObjectMapper mapper = new ObjectMapper();
            FuncionarioModel funcionarioModel = mapper.readValue(funcString, FuncionarioModel.class);
            String fotoName =  fileStorageService.storeFile(foto);
            funcionarioModel.setMatricula(repository.getNexMatricula() + 1);
            String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/funcionario/getFoto/")
                    .path(fotoName)
                    .toUriString();

            funcionarioModel.setFoto(fileDownloadUri);

            return repository.saveAndFlush(funcionarioModel);
        }
        else{
            return null;
        }

    }

}

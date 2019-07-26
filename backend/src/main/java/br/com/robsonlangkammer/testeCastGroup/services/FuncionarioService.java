package br.com.robsonlangkammer.testeCastGroup.services;

import br.com.robsonlangkammer.testeCastGroup.bean.ResultResponseList;
import br.com.robsonlangkammer.testeCastGroup.form.FuncionarioForm;
import br.com.robsonlangkammer.testeCastGroup.model.FuncionarioModel;
import br.com.robsonlangkammer.testeCastGroup.repository.FuncionarioRepository;
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

        Page<FuncionarioModel> listPage = repository.findByNome(campo, paginacao);

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


    public FuncionarioModel criarFuncionario(FuncionarioForm funcionarioForm,MultipartFile foto){

        if(!foto.isEmpty())
        {
            FuncionarioModel funcionarioModel = funcionarioForm.getFuncionario();
            //subindo upload da foto
            String fotoName =  fileStorageService.storeFile(foto);
            String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/downloadFile/")
                    .path(fotoName)
                    .toUriString();

            funcionarioModel.setFoto(fileDownloadUri);

            return repository.save(funcionarioModel);
        }
        else{
            return null;
        }

    }

}

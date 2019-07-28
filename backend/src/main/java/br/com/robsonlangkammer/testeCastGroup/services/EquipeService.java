package br.com.robsonlangkammer.testeCastGroup.services;

import br.com.robsonlangkammer.testeCastGroup.bean.ResultResponseList;
import br.com.robsonlangkammer.testeCastGroup.model.EquipeModel;
import br.com.robsonlangkammer.testeCastGroup.repository.EquipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EquipeService {


    @Autowired
    EquipeRepository repository;

    public ResultResponseList search(Pageable paginacao, String campo) {

        ResultResponseList resultResponseList = new ResultResponseList();

        Page<EquipeModel> listPage = repository.findByNomeContaining(campo, paginacao);

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


}

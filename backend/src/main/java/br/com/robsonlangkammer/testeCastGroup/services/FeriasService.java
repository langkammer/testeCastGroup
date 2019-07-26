package br.com.robsonlangkammer.testeCastGroup.services;

import br.com.robsonlangkammer.testeCastGroup.bean.FeriasBeans;
import br.com.robsonlangkammer.testeCastGroup.bean.ResultResponseList;
import br.com.robsonlangkammer.testeCastGroup.model.FeriasModel;
import br.com.robsonlangkammer.testeCastGroup.model.UserModel;
import br.com.robsonlangkammer.testeCastGroup.repository.FeriasRepository;
import org.joda.time.Interval;
import org.joda.time.Period;
import org.joda.time.PeriodType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.*;

@Service
public class FeriasService {


    @Autowired
    FeriasRepository repository;


    public ResultResponseList search(Pageable paginacao, String campo) {

        ResultResponseList resultResponseList = new ResultResponseList();

        Page<FeriasModel> listPage = repository.findByFuncionarioNome(campo, paginacao);

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


    public ResultResponseList searchByMatricula(Pageable paginacao, String campo) {

        ResultResponseList resultResponseList = new ResultResponseList();

        Page<FeriasModel> listPage = repository.findByFuncionarioMatricula(campo, paginacao);

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

    public UserModel cadastrarFerias(FeriasModel feriasModel){

       return null;

    }



    public ResultResponseList searchFeriasVencendo(String numMaxMeses) {

        Date hoje = new Date();

        Calendar cal = Calendar.getInstance();

        cal.setTime(hoje); // Objeto Date() do usuário

        cal.add(cal.YEAR, - 2); //tira 1 e ja possibilita tirar ferias

        Date anterior = new Date(cal.getTimeInMillis());

        List<FeriasModel> listPage = repository.findByStartDataFinalBetween(anterior,hoje);

        ResultResponseList resultResponseList = new ResultResponseList();

        List<FeriasBeans> listFerias = new ArrayList<FeriasBeans>();

        for (FeriasModel ferias : listPage) {
            FeriasBeans fBean = new FeriasBeans();

            Calendar calendar = Calendar.getInstance();

            calendar.setTime(ferias.getDataFinal()); // Objeto Date() do usuário

            calendar.add(calendar.YEAR, 2);

            Date limitDate = new Date(calendar.getTimeInMillis());


            Period period = new Period(hoje, limitDate);

            intervalo.get


            if (ferias.getDataFinal())
        }


        return resultResponseList;
    }

}

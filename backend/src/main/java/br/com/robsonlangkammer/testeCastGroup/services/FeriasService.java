package br.com.robsonlangkammer.testeCastGroup.services;


import br.com.robsonlangkammer.testeCastGroup.bean.FeriasConsulta;
import br.com.robsonlangkammer.testeCastGroup.bean.ResultResponseList;
import br.com.robsonlangkammer.testeCastGroup.model.FeriasModel;
import br.com.robsonlangkammer.testeCastGroup.repository.FeriasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.*;

@Service
public class FeriasService {


    @Autowired
    FeriasRepository repository;


    public ResultResponseList search(Pageable paginacao, String pesquisa, String campo) {

        ResultResponseList resultResponseList = new ResultResponseList();

        Page<FeriasModel> listPage = null;

        if(campo.equals("nome"))
             listPage = repository.findByFuncionarioNomeContaining(pesquisa, paginacao);
        else if(campo.equals("matricula"))
              listPage = repository.findByFuncionarioMatricula(Long.parseLong(pesquisa),paginacao);


        if(pesquisa.isEmpty()){
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


    public Page<FeriasModel> searchByMatricula(Pageable paginacao, Long matricula) {

        Page<FeriasModel> listPage = repository.findByFuncionarioMatricula(matricula, paginacao);

        return listPage;
    }

    public FeriasConsulta cadastrarFerias(FeriasModel feriasForm){
        FeriasConsulta feriasConsulta =  new FeriasConsulta();
        if(vericaTempoAdmissao(feriasForm.getFuncionario().getId())){
            if(hasFerias(feriasForm.getFuncionario().getId())){
                if(hasDiasEquipesByFerias(feriasForm)){
                    feriasConsulta.setOk(true);
                    feriasConsulta.setFeriasModel(repository.save(feriasForm));
                    feriasConsulta.setMsg("Férias Criadas");
                }
                else{
                    feriasConsulta.setOk(false);
                    feriasConsulta.setMsg("Existem outros Funcionarios Solicitaram férias nessas datas");
                }
            }
            else{
                feriasConsulta.setOk(false);
                feriasConsulta.setMsg("Funcionario não pode solicitar novas férias devido a ultima ainda não ter atigido 1 ano");
            }
        }
        else{
            feriasConsulta.setOk(false);
            feriasConsulta.setMsg("Funcionario não cumpriu 1 ano de empresa");
        }

        return feriasConsulta;
    }

    public boolean vericaTempoAdmissao(Long idFuncionario){
        Integer tempo = repository.tempoDeCasa(idFuncionario);
        if(tempo>=1)
            return true;
        else
            return false;
    }

    public boolean hasFerias(Long idFuncionario){
        Optional<FeriasModel> ferias = repository.getFeriasByNumAnosMaxAndFuncionario(1,idFuncionario);
        if(ferias.isPresent())
            return false;
        else
            return true;
    }

    public boolean hasDiasEquipesByFerias(FeriasModel feriasModel){
        int quantidadeFuncionarioEquipe = repository.countFuncionarioByEquipe(feriasModel.getFuncionario().getEquipe().getId());
        if(quantidadeFuncionarioEquipe <= 4){
           if(haveMinimoDeEquipeTrabalhando(feriasModel.getDataInicial(),feriasModel.getDataFinal(),feriasModel.getFuncionario().getId(),feriasModel.getFuncionario().getEquipe().getId()))
               return true;
           else
               return false;
        }
        else{
            return true;
        }
    }

    public boolean haveMinimoDeEquipeTrabalhando(Date dataIni, Date dataFim, Long idFuncionario,Long idEquipe){
        List<FeriasModel> list = repository.verificaDatasFeriaPeriodo(dataIni,dataFim,idFuncionario,idEquipe);
        if(list.size() >= 2)
            return false;
        else
            return true;
    }


    public ResultResponseList searchFeriasVencendo(Pageable paginacao,Integer numMaxMeses) {
        Page<FeriasModel> listPage = repository.getFeriasByNumMesesMax(numMaxMeses,paginacao);

        ResultResponseList resultResponseList = new ResultResponseList();


        resultResponseList.setTotalElements(listPage.getTotalElements());
        resultResponseList.setTotalPages(listPage.getTotalPages());

        if(listPage.getContent()!=null)
            resultResponseList.setData((List<Object>) (List) listPage.getContent());
        else
            resultResponseList.setData(null);


        return resultResponseList;
    }

    public ResultResponseList pesquisarFerias(Pageable paginacao, String pesquisa,String campo,String tipoPesquisa,String meses) {
        if(tipoPesquisa.equals("all"))
            return search(paginacao,pesquisa,campo);
        else if (tipoPesquisa.equals("vencendo"))
            return searchFeriasVencendo(paginacao,Integer.parseInt(meses));

        return null;
    }


}

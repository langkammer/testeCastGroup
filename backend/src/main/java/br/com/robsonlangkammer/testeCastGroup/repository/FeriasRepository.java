package br.com.robsonlangkammer.testeCastGroup.repository;

import br.com.robsonlangkammer.testeCastGroup.model.FeriasModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface FeriasRepository extends JpaRepository<FeriasModel, Long> {


    Page<FeriasModel> findByFuncionarioNome(@Param("nome") String nome, Pageable pageable);

    Page<FeriasModel> findByFuncionarioMatricula(@Param("matricula") String matricula, Pageable pageable);

    List<FeriasModel> findByStartDataFinalBetween(Date date1, Date date2);

}

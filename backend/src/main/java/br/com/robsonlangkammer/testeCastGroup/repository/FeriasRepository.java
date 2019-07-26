package br.com.robsonlangkammer.testeCastGroup.repository;

import br.com.robsonlangkammer.testeCastGroup.model.FeriasModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface FeriasRepository extends JpaRepository<FeriasModel, Long> {


    Page<FeriasModel> findByFuncionarioNomeContaining(@Param("nome") String nome, Pageable pageable);

    Page<FeriasModel> findByFuncionarioMatricula(@Param("matricula") Long matricula, Pageable pageable);

    @Query("select f from FeriasModel f where DATEDIFF ( MONTH , DATEADD(year, 2, f.dataFinal)  ,  GETDATE())  >= :numMeses")
    List<FeriasModel> getFeriasByNumMesesMax(@Param("numMeses") Integer numMeses);


    @Query("select f from FeriasModel f where datediff(YEAR, f.dataFinal  , GETDATE())  >= :numAnos and f.funcionario.id = :idFuncionario")
    Optional<FeriasModel> getFeriasByNumAnosMaxAndFuncionario(@Param("numAnos") Integer numAnos, @Param("idFuncionario") Long idFuncionario);

    @Query("select count(equipe) from FuncionarioModel f where equipe.id = :idEquipe")
    int countFuncionarioByEquipe(@Param("idEquipe") Long idEquipe);


    @Query(" select f from FeriasModel f " +
           " where f.dataInicial >= :dataInicial and " +
           " f.dataFinal <= :dataFinal and " +
           " f.funcionario.id <> :idFuncionario and " +
           " f.funcionario.equipe.id = :idEquipe")
    List<FeriasModel> verificaDatasFeriaPeriodo(@Param("dataInicial") Date dataInicial,
                                                @Param("dataFinal") Date dataFinal,
                                                @Param("idFuncionario") Long idFuncionario,
                                                @Param("idEquipe") Long idEquipe);


    @Query("select datediff(YEAR, f.dataAdmissao    , GETDATE()) from FuncionarioModel f where f.id = :idFuncionario")
    int tempoDeCasa(@Param("idFuncionario")Long idFuncionario);

}

package br.com.robsonlangkammer.testeCastGroup.repository;

import br.com.robsonlangkammer.testeCastGroup.model.FuncionarioModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FuncionarioRepository extends JpaRepository<FuncionarioModel, Long> {

    Page<FuncionarioModel> findByNomeContaining(@Param("nome") String nome, Pageable pageable);

    @Query(value = "SELECT COUNT(f.id) FROM FuncionarioModel f")
    Long getNexMatricula();
}

package br.com.robsonlangkammer.testeCastGroup.repository;

import br.com.robsonlangkammer.testeCastGroup.model.EquipeModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface EquipeRepository extends JpaRepository<EquipeModel, Long> {

    Page<EquipeModel> findByNomeContaining(@Param("nome") String nome, Pageable pageable);

}

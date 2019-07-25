package br.com.robsonlangkammer.testeCastGroup.repository;

import br.com.robsonlangkammer.testeCastGroup.model.Perfil;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface PerfilRepository extends JpaRepository<Perfil, Long> {

    Optional<Perfil> findByNome(@Param("nome") String nome);

}

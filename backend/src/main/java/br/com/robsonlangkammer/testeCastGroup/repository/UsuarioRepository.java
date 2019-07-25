package br.com.robsonlangkammer.testeCastGroup.repository;

import br.com.robsonlangkammer.testeCastGroup.model.UserModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<UserModel, Long> {

    Optional<UserModel> findByEmail(@Param("email") String email);

    Page<UserModel> findByNome(@Param("nome") String nome, Pageable pageable);

}

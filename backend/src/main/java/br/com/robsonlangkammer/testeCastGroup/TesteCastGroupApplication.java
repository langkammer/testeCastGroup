package br.com.robsonlangkammer.testeCastGroup;

import br.com.robsonlangkammer.testeCastGroup.config.FileStorageConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.web.config.EnableSpringDataWebSupport;


@SpringBootApplication
@EnableSpringDataWebSupport
@EnableCaching
@EnableConfigurationProperties({
		FileStorageConfig.class
})
public class TesteCastGroupApplication {


	public static void main(String[] args) {
		SpringApplication.run(TesteCastGroupApplication.class, args);
	}


}

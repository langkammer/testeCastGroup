package br.com.robsonlangkammer.testeCastGroup;

import br.com.robsonlangkammer.testeCastGroup.config.FileStorageConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.data.web.config.EnableSpringDataWebSupport;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import javax.servlet.MultipartConfigElement;

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

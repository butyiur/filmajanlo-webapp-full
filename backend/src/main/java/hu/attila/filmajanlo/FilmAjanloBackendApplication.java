package hu.attila.filmajanlo;

import hu.attila.filmajanlo.model.Category;
import hu.attila.filmajanlo.model.Movie;
import hu.attila.filmajanlo.repository.CategoryRepository;
import hu.attila.filmajanlo.repository.MovieRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class FilmAjanloBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(FilmAjanloBackendApplication.class, args);
	}

	@Bean
	public CommandLineRunner dataLoader(MovieRepository movieRepo, CategoryRepository categoryRepo) {
		return args -> {

			Category action = new Category();
			action.setName("Action");
			action.setDescription("Action movies");
			categoryRepo.save(action);

			Category scifi = new Category();
			scifi.setName("Sci-Fi");
			scifi.setDescription("Science fiction films");
			categoryRepo.save(scifi);

		};
	}
}

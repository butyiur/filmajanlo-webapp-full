package hu.attila.filmajanlo;

import hu.attila.filmajanlo.model.Category;
import hu.attila.filmajanlo.model.Movie;
import hu.attila.filmajanlo.model.User;
import hu.attila.filmajanlo.repository.CategoryRepository;
import hu.attila.filmajanlo.repository.MovieRepository;
import hu.attila.filmajanlo.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime; 

@SpringBootApplication
@EntityScan(basePackages = "hu.attila.filmajanlo.model")
@EnableJpaRepositories(basePackages = "hu.attila.filmajanlo.repository")
@ComponentScan(basePackages = "hu.attila.filmajanlo")
public class FilmAjanloBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(FilmAjanloBackendApplication.class, args);
	}

	@Bean
	public CommandLineRunner dataLoader(MovieRepository movieRepo, CategoryRepository categoryRepo) {
		return args -> {
			// ide tehetsz később alap filmeket vagy kategóriákat
		};
	}

	@Bean
	CommandLineRunner initDefaultUsers(UserRepository userRepository, PasswordEncoder encoder) {
		return args -> {

			// ADMIN létrehozása
			userRepository.findByUsername("admin").ifPresentOrElse(
					u -> System.out.println("ℹ️ Admin már létezik."),
					() -> {
						User a = new User();
						a.setUsername("admin");
						a.setPasswordHash(encoder.encode("admin123"));
						a.setRole("ADMIN");
						a.setCreatedAt(LocalDateTime.now());
						a.setLastLogin(null);
						userRepository.save(a);
						System.out.println("✅ Admin létrehozva: admin / admin123");
					}
			);

			// TESZTUSER létrehozása
			userRepository.findByUsername("tesztuser").ifPresentOrElse(
					u -> System.out.println("ℹ️ Tesztuser már létezik."),
					() -> {
						User u = new User();
						u.setUsername("tesztuser");
						u.setPasswordHash(encoder.encode("teszt123"));
						u.setRole("USER");
						u.setCreatedAt(LocalDateTime.now());
						u.setLastLogin(null);
						userRepository.save(u);
						System.out.println("✅ Tesztuser létrehozva: tesztuser / teszt123");
					}
			);
		};
	}
}

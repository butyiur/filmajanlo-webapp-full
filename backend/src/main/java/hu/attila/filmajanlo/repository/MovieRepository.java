package hu.attila.filmajanlo.repository;

import hu.attila.filmajanlo.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, Long> {

    // Keresés cím alapján (contains, case-insensitive)
    List<Movie> findByTitleContainingIgnoreCase(String title);

    // Kategória alapján listázás
    List<Movie> findByCategoryId(Long categoryId);
}
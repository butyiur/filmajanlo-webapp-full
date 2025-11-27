package hu.attila.filmajanlo.service;

import hu.attila.filmajanlo.model.Movie;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MovieService {

    List<Movie> findAll();
    Movie findById(Long id);
    Movie save(Movie movie);
    Movie update(Long id, Movie movie);
    void delete(Long id);

    // megmaradhatnak a régi egyszerű keresők is
    List<Movie> searchByTitle(String title);
    List<Movie> findByCategory(Long categoryId);

    Page<Movie> search(String title, String director, Long categoryId, Integer yearFrom, Integer yearTo, Pageable pageable);
}
package hu.attila.filmajanlo.repository;

import hu.attila.filmajanlo.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}
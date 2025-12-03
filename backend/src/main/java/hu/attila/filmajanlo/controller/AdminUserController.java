package hu.attila.filmajanlo.controller;

import hu.attila.filmajanlo.model.User;
import hu.attila.filmajanlo.repository.UserMovieRepository;
import hu.attila.filmajanlo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminUserController {

    private final UserRepository userRepository;
    private final UserMovieRepository userMovieRepository;

    // 🔹 Összes user listázása
    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> listUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    // 🔹 User törlése saját filmekkel együtt
    @DeleteMapping("/users/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        if (!userRepository.existsById(id)) {
            return ResponseEntity.badRequest().body("User not found");
        }

        // 🔸 töröljük a user saját listáját
        userMovieRepository.deleteByOwnerId(id);

        // 🔸 töröljük magát a usert
        userRepository.deleteById(id);

        return ResponseEntity.ok("User deleted successfully");
    }
}
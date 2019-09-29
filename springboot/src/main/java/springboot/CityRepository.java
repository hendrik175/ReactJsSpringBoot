package springboot;

import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import springboot.City;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface CityRepository extends CrudRepository<City, Integer> {
    @Query("SELECT t FROM City t WHERE t.name = ?1")
    List<City> findByName(String city);
    @Transactional
    @Modifying
    @Query("DELETE FROM City c WHERE c.name = ?1")
    void deleteByName(String city);

}
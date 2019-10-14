package edu.hm.wiesheu.markus.ausleih3000.repository;

import edu.hm.wiesheu.markus.ausleih3000.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {
}

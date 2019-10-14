package edu.hm.wiesheu.markus.ausleih3000.controller;

import edu.hm.wiesheu.markus.ausleih3000.model.Item;
import edu.hm.wiesheu.markus.ausleih3000.repository.ItemRepository;
import edu.hm.wiesheu.markus.ausleih3000.repository.LoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/item")
public class ItemController {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private LoanRepository loanRepository;

    @GetMapping
    public List<Item> all(){
        return itemRepository.findAll();
    }

    @PostMapping
    public Item create(@RequestBody Item input){
        return itemRepository.save(input);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id){
        itemRepository.deleteById(id);
    }

    @GetMapping("/available")
    public Set<Item> available() {
        return itemRepository.findAll()
                .stream()
                .filter(item -> !loanRepository.
                        findAll()
                        .stream()
                        .anyMatch(loan -> loan.getItem()
                                .equals(item)))
                .collect(Collectors.toSet());
    }

}

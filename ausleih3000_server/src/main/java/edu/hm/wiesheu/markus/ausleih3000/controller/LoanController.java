package edu.hm.wiesheu.markus.ausleih3000.controller;


import edu.hm.wiesheu.markus.ausleih3000.model.Loan;
import edu.hm.wiesheu.markus.ausleih3000.repository.ItemRepository;
import edu.hm.wiesheu.markus.ausleih3000.repository.LoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/loan")
public class LoanController {

    @Autowired
    private LoanRepository loanRepository;

    @Autowired
    private ItemRepository itemRepository;



    @GetMapping
    public List<Loan> all(){
        return loanRepository.findAll();
    }

    @PostMapping
    public Loan create(@RequestBody Loan input){
        if(loanRepository.findAll().stream().anyMatch(loan -> loan.getItem().getId().equals(input.getItem().getId()))){
            throw new IllegalArgumentException("Item already borrowed.");
        }

        return loanRepository.save(input);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id){
        loanRepository.deleteById(id);
    }

    @GetMapping("/status")
    public List<Long> status(){
        List<Long> status = new ArrayList<>();
        status.add(loanRepository.count());
        status.add(loanRepository.findAll().stream().filter(loan -> loan.getDueDate().compareTo(new Date(System.currentTimeMillis())) < 0 ).count());
        return status;
    }





}

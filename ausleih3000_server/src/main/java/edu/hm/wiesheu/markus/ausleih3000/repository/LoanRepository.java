package edu.hm.wiesheu.markus.ausleih3000.repository;

import edu.hm.wiesheu.markus.ausleih3000.model.Loan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoanRepository extends JpaRepository<Loan, Long> {
}

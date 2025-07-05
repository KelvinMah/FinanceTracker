package com.kelvin.financetracker.repository;

import com.kelvin.financetracker.model.Budget;
import com.kelvin.financetracker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BudgetRepository extends JpaRepository<Budget, Long> {
    List<Budget> findByUser(User user);
}

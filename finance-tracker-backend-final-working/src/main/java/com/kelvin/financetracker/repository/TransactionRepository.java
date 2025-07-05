package com.kelvin.financetracker.repository;

import com.kelvin.financetracker.model.Transaction;
import com.kelvin.financetracker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByUser(User user);
}

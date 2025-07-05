package com.kelvin.financetracker.service;

import com.kelvin.financetracker.model.Transaction;
import com.kelvin.financetracker.model.User;
import com.kelvin.financetracker.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TransactionService {
    private final TransactionRepository repo;

    public TransactionService(TransactionRepository repo) {
        this.repo = repo;
    }

    public List<Transaction> getTransactions(User user) {
        return repo.findByUser(user);
    }

    public Transaction addTransaction(User user, Transaction tx) {
        tx.setUser(user);
        tx.setDate(LocalDate.now());
        return repo.save(tx);
    }
}

package com.kelvin.financetracker.service;

import com.kelvin.financetracker.model.Transaction;
import com.kelvin.financetracker.repository.TransactionRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TransactionService {
    private final TransactionRepository repo;

    public TransactionService(TransactionRepository repo) {
        this.repo = repo;
    }

    public Transaction add(Transaction tx) {
        return repo.save(tx);
    }

    public List<Transaction> list() {
        return repo.findAll();
    }

    public Transaction update(Long id, Transaction newTx) {
        return repo.findById(id).map(tx -> {
            tx.setAmount(newTx.getAmount());
            tx.setCategory(newTx.getCategory());
            tx.setDate(newTx.getDate());
            tx.setDescription(newTx.getDescription());
            return repo.save(tx);
        }).orElseThrow();
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
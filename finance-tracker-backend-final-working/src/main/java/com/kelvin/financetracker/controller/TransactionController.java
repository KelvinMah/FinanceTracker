package com.kelvin.financetracker.controller;

import com.kelvin.financetracker.model.Transaction;
import com.kelvin.financetracker.model.User;
import com.kelvin.financetracker.service.TransactionService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService service;

    public TransactionController(TransactionService service) {
        this.service = service;
    }

    @GetMapping
    public List<Transaction> getAll(@AuthenticationPrincipal User user) {
        return service.getTransactions(user);
    }

    @PostMapping
    public ResponseEntity<Transaction> add(@AuthenticationPrincipal User user, @RequestBody Transaction tx) {
        return ResponseEntity.ok(service.addTransaction(user, tx));
    }
}

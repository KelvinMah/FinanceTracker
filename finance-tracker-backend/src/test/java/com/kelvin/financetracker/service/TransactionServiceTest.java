package com.kelvin.financetracker.service;

import com.kelvin.financetracker.model.Category;
import com.kelvin.financetracker.model.Transaction;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class TransactionServiceTest {
    @Autowired TransactionService service;

    @Test
    public void testAddTransaction() {
        Transaction tx = new Transaction();
        tx.setDescription("Test Purchase");
        tx.setAmount(99.99);
        tx.setDate(LocalDate.now());
        tx.setCategory(new Category(null, "Test Category"));

        Transaction saved = service.add(tx);
        assertNotNull(saved.getId());
    }
}
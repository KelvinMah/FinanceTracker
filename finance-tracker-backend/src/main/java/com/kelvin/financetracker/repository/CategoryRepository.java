package com.kelvin.financetracker.repository;

import com.kelvin.financetracker.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {}
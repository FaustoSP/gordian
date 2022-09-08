package com.faustopasserini.gordian.repository;

import com.faustopasserini.gordian.data.Issue;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.math.BigInteger;

public interface IssueRepository extends MongoRepository<Issue, String> {
}

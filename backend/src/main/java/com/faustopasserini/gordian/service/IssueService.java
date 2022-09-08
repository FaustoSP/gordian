package com.faustopasserini.gordian.service;

import com.faustopasserini.gordian.data.Issue;
import com.faustopasserini.gordian.exception.EntityNotFoundException;
import com.faustopasserini.gordian.repository.IssueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.List;

@Service
public class IssueService {
    @Autowired
    private IssueRepository issueRepository;

    public List<Issue> findAll(){
        return issueRepository.findAll();
    }

    public Issue findById(String id){
        return issueRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public Issue save(Issue issue){
        return issueRepository.save(issue);
    }

    public void deleteById(String id){
        issueRepository.deleteById(id);
    }
}

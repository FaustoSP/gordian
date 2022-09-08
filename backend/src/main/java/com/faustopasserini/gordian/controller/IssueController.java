package com.faustopasserini.gordian.controller;

import com.faustopasserini.gordian.data.Issue;
import com.faustopasserini.gordian.service.IssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.List;

@RestController
@RequestMapping("/api/issue")
@CrossOrigin
public class IssueController {

    @Autowired
    private IssueService issueService;

    @GetMapping
    public List<Issue> findAll(){
        return issueService.findAll();
    }

    @GetMapping("/{id}")
    public Issue findById(@PathVariable String id){
        return issueService.findById(id);
    }

    @PostMapping
    public Issue create(@RequestBody Issue issue){
        return issueService.save(issue);
    }

    @PutMapping
    public Issue update(@RequestBody Issue issue){
        return issueService.save(issue);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable String id){
        issueService.deleteById(id);
    }
}

package com.faustopasserini.gordian.data;

import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public class Issue {

    @Id
    private String id;
    private String title;
    private String body;
    private boolean complete;
    private String status; //backlog, in_progress, QA, resolved
}

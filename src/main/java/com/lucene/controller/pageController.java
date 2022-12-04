package com.lucene.controller;

import com.lucene.service.luceneService;
import org.apache.lucene.queryparser.classic.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/search")
public class pageController {
    @Autowired
    luceneService luceneService;
    @GetMapping("/{key}")
    Result Search(@PathVariable String key) throws IOException, ParseException {
        return new Result(Code.OK,luceneService.search(key));
    }

}

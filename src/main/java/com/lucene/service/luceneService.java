package com.lucene.service;

import com.lucene.domain.pageInfo;
import com.lucene.myLucene.MyIKAnalyzer;
import org.apache.lucene.queryparser.classic.ParseException;

import java.io.IOException;
import java.util.List;

public interface luceneService {
     String PATH="/indexDir";
    void createIndex() throws IOException;
    List<pageInfo> search(String keyWords) throws IOException, ParseException;
}

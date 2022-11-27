package com.lucene;

import com.lucene.myLucene.MyIKAnalyzer;
import com.lucene.service.luceneService;
import org.apache.lucene.document.Document;
import org.apache.lucene.index.DirectoryReader;
import org.apache.lucene.index.IndexReader;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.queryparser.classic.ParseException;
import org.apache.lucene.queryparser.classic.QueryParser;
import org.apache.lucene.search.*;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.FSDirectory;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.wltea.analyzer.lucene.IKAnalyzer;

import java.io.IOException;
import java.nio.file.FileSystems;

@SpringBootTest
class LuceneApplicationTests {
    @Autowired
    luceneService luceneService;

    @Test
    void contextLoads() throws IOException, ParseException {
        luceneService.createIndex();
        // 索引读取工具
        Directory directory=FSDirectory.open(FileSystems.getDefault().getPath(luceneService.PATH));
        MyIKAnalyzer ikAnalyzer=new MyIKAnalyzer();
        IndexReader reader = DirectoryReader.open(directory);
        // 索引搜索工具
        IndexSearcher indexSearcher=  new IndexSearcher(reader);
        QueryParser parser=new QueryParser("title",ikAnalyzer);
        Query query=parser.parse("谷歌和腾讯");
        TopDocs topDocs=indexSearcher.search(query,8);
        ScoreDoc[] scoreDocs=topDocs.scoreDocs;
        for(ScoreDoc scoreDoc: scoreDocs)
        {
            Document document =indexSearcher.doc(scoreDoc.doc);
        }
    }

}

package com.lucene.service.impl;

import com.lucene.dao.luceneDao;
import com.lucene.domain.pageInfo;
import com.lucene.myLucene.MyIKAnalyzer;
import com.lucene.service.luceneService;
import org.apache.lucene.document.Document;
import org.apache.lucene.document.Field;
import org.apache.lucene.document.StringField;
import org.apache.lucene.document.TextField;
import org.apache.lucene.index.DirectoryReader;
import org.apache.lucene.index.IndexReader;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.index.IndexWriterConfig;
import org.apache.lucene.queryparser.classic.ParseException;
import org.apache.lucene.queryparser.classic.QueryParser;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.search.Query;
import org.apache.lucene.search.ScoreDoc;
import org.apache.lucene.search.TopDocs;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.FSDirectory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.FileSystems;
import java.util.ArrayList;
import java.util.List;

@Service
public class luceneServiceImpl implements luceneService {
    @Autowired
    public luceneDao luceneDao;
    private final MyIKAnalyzer ikAnalyzer=new MyIKAnalyzer();
    public static final String PATH="/indexDir";
    private void createPageIndex(List<pageInfo> pageInfos) throws IOException {
        Directory directory=FSDirectory.open(FileSystems.getDefault().getPath(PATH));

        IndexWriterConfig indexWriterConfig=new IndexWriterConfig(ikAnalyzer);
        indexWriterConfig.setOpenMode(IndexWriterConfig.OpenMode.CREATE);

        IndexWriter indexWriter=new IndexWriter(directory,indexWriterConfig);

        List<Document> documents=new ArrayList<>();
        for(pageInfo p:pageInfos)
        {
            Document document=new Document();
            document.add(new TextField("title",p.getTitle(), Field.Store.YES));
            document.add(new TextField("author",p.getAuthor(),Field.Store.YES));
            document.add(new StringField("url",p.getUrl(),Field.Store.YES));
            document.add(new StringField("dayTime",p.getDayTime(),Field.Store.YES));
            document.add(new TextField("detail",p.getDetail(),Field.Store.YES));
            documents.add(document);
        }
        indexWriter.addDocuments(documents);
        indexWriter.commit();
        indexWriter.close();
    }

    @Override
    public void createIndex() throws IOException {
         createPageIndex(luceneDao.selectPage());
    }

    @Override
    public List<pageInfo> search(String keyWords) throws IOException, ParseException {
        Directory directory=FSDirectory.open(FileSystems.getDefault().getPath(luceneService.PATH));
        MyIKAnalyzer ikAnalyzer=new MyIKAnalyzer();
        IndexReader reader = DirectoryReader.open(directory);
        IndexSearcher indexSearcher=  new IndexSearcher(reader);
        QueryParser parser=new QueryParser("title",ikAnalyzer);
        Query query=parser.parse(keyWords);
        TopDocs topDocs=indexSearcher.search(query,10);
        ScoreDoc[] scoreDocs=topDocs.scoreDocs;
        List<pageInfo> pageInfos=new ArrayList<>();
        for(ScoreDoc scoreDoc: scoreDocs)
        {
            Document document =indexSearcher.doc(scoreDoc.doc);
            pageInfos.add(new pageInfo(document.get("title"),document.get("author"),document.get("url"),document.get("dayTime"),document.get("detail")));
        }
        return pageInfos;
    }
}

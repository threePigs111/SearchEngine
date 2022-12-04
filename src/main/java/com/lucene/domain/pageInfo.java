package com.lucene.domain;

public class pageInfo {
       private String title;
       private String author;
       private String url;
       private String dayTime;
       private String Detail;

    @Override
    public String toString() {
        return "pageInfo{" +
                "title='" + title + '\'' +
                ", author='" + author + '\'' +
                ", url='" + url + '\'' +
                ", dayTime='" + dayTime + '\'' +
                ", Detail='" + Detail + '\'' +
                '}';
    }

    public pageInfo() {
    }

    public pageInfo(String title, String author, String url, String dayTime, String detail) {
        this.title = title;
        this.author = author;
        this.url = url;
        this.dayTime = dayTime;
        Detail = detail;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getDayTime() {
        return dayTime;
    }

    public void setDayTime(String dayTime) {
        this.dayTime = dayTime;
    }

    public String getDetail() {
        return Detail;
    }

    public void setDetail(String detail) {
        Detail = detail;
    }
}

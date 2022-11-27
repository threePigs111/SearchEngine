package com.lucene.dao;

import com.lucene.domain.pageInfo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface luceneDao {
    @Select("select * from csdntable")
     List<pageInfo> selectPage();

}

package com.lucene.controller;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class Exception {
    @ExceptionHandler(java.lang.Exception.class)
    public Result dealException(Exception e)
    {
        return new Result(Code.NOT_OK,null,"出错了");
    }

}

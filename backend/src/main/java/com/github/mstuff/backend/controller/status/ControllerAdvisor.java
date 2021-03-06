package com.github.mstuff.backend.controller.status;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;
import java.util.NoSuchElementException;

@Slf4j
@ControllerAdvice
public class ControllerAdvisor extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = {IllegalArgumentException.class})
    protected ResponseEntity<Object> handleConflict(IllegalArgumentException ex, WebRequest request){

        ErrorResponse bodyOfResponse = ErrorResponse.builder()
                .errorMessage("There was an illegal argument in the request: " + ex.getMessage())
                .timeStamp(LocalDateTime.now())
                .requestUri(request.getDescription(false))
                .build();

        log.error("There was an illegal argument in the request ", ex);

        return handleExceptionInternal(ex, bodyOfResponse, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }

    @ExceptionHandler(value = {NoSuchElementException.class})
    protected ResponseEntity<Object> handleConflict(NoSuchElementException ex, WebRequest request){

        ErrorResponse bodyOfResponse = ErrorResponse.builder()
                .errorMessage("This element does not exist: " + ex.getMessage())
                .timeStamp(LocalDateTime.now())
                .requestUri(request.getDescription(false))
                .build();

        log.error("This element does not exist. ", ex);

        return handleExceptionInternal(ex, bodyOfResponse, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }
}

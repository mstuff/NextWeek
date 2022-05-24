package com.github.mstuff.backend.controller.status;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class ErrorResponse {

    private String errorMessage;
    private LocalDateTime timeStamp;
    private String requestUri;

}

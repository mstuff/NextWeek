package com.github.mstuff.backend.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DtoNewScheduleEntry {

    private String title;
    private String description;
    private String entryDate;
    private String entryTime;

}

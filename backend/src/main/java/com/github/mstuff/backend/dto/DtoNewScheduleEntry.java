package com.github.mstuff.backend.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DtoNewScheduleEntry {

    private String title;
    private String description;
    private Instant entryDate;
    private Integer durationInMinutes;

}

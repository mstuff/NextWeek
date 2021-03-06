package com.github.mstuff.backend.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "scheduleEntries")
public class ScheduleEntry {

    @Id
    private String id;
    private String title;
    private String description;
    private Instant entryDate;
    private Integer durationInMinutes;

}

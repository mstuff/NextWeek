package com.github.mstuff.backend.controller;

import com.github.mstuff.backend.model.ScheduleEntry;
import com.github.mstuff.backend.service.ScheduleEntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/schedule")
public class ScheduleEntryController {

    private final ScheduleEntryService scheduleEntryService;

    @Autowired
    public ScheduleEntryController(ScheduleEntryService scheduleEntryService) {
        this.scheduleEntryService = scheduleEntryService;
    }

    @GetMapping
    public List<ScheduleEntry> getAllScheduleEntries(){
        return scheduleEntryService.getAllScheduleEntries();
    }


}

package com.github.mstuff.backend.controller;

import com.github.mstuff.backend.dto.DtoScheduleEntry;
import com.github.mstuff.backend.model.ScheduleEntry;
import com.github.mstuff.backend.service.ScheduleEntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public List<ScheduleEntry> getAllScheduleEntries() {
        return scheduleEntryService.getAllScheduleEntries();
    }

    @PostMapping
    public ScheduleEntry addNewScheduleEntry(@RequestBody DtoScheduleEntry dtoNewScheduleEntry) {
        return scheduleEntryService.addNewScheduleEntry(dtoNewScheduleEntry);
    }

    @PutMapping("{id}")
    public ScheduleEntry updateScheduleEntry(@PathVariable String id, @RequestBody DtoScheduleEntry dtoUpdateEntry) {
        return scheduleEntryService.updateScheduleEntry(id, dtoUpdateEntry);
    }

    @DeleteMapping("{id}")
    public void deleteScheduleEntryById(@PathVariable String id) {
        scheduleEntryService.deleteEntryById(id);
    }


}

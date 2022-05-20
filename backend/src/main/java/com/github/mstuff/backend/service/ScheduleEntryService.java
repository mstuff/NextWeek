package com.github.mstuff.backend.service;

import com.github.mstuff.backend.model.ScheduleEntry;
import com.github.mstuff.backend.repository.ScheduleEntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScheduleEntryService {

    private final ScheduleEntryRepository scheduleEntryRepository;

    @Autowired
    public ScheduleEntryService(ScheduleEntryRepository scheduleEntryRepository) {
        this.scheduleEntryRepository = scheduleEntryRepository;
    }

    public List<ScheduleEntry> getAllScheduleEntries(){
       return scheduleEntryRepository.findAll();
    }


}

package com.github.mstuff.backend.service;

import com.github.mstuff.backend.dto.DtoNewScheduleEntry;
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

    public List<ScheduleEntry> getAllScheduleEntries() {
        return scheduleEntryRepository.findAll();
    }

    public ScheduleEntry addNewScheduleEntry(DtoNewScheduleEntry dtoNewScheduleEntry) {

        try {
            validateInput(dtoNewScheduleEntry);
            ScheduleEntry newScheduleEntry = new ScheduleEntry();

            newScheduleEntry.setTitle(dtoNewScheduleEntry.getTitle());
            newScheduleEntry.setDescription(dtoNewScheduleEntry.getDescription());
            newScheduleEntry.setEntryDummyDate(dtoNewScheduleEntry.getEntryDummyDate());

            return scheduleEntryRepository.insert(newScheduleEntry);

        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException(e.getMessage());
        }
    }

    private void validateInput(DtoNewScheduleEntry dtoNewEntry) {

        if (dtoNewEntry.getTitle() == null) {
            throw new IllegalArgumentException("The title of the new entry was null");
        } else if (dtoNewEntry.getDescription() == null) {
            throw new IllegalArgumentException("The description of the new entry was null");
        } else if (dtoNewEntry.getEntryDummyDate() == null) {
            throw new IllegalArgumentException("The date of the new entry was null");
        }
    }
}

package com.github.mstuff.backend.service;

import com.github.mstuff.backend.dto.DtoScheduleEntry;
import com.github.mstuff.backend.model.ScheduleEntry;
import com.github.mstuff.backend.repository.ScheduleEntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;


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

    public ScheduleEntry addNewScheduleEntry(DtoScheduleEntry dtoNewScheduleEntry) {
        try {
            validateInput(dtoNewScheduleEntry);
            ScheduleEntry newScheduleEntry = extractEntryFromDto(dtoNewScheduleEntry);
            return scheduleEntryRepository.insert(newScheduleEntry);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException(e.getMessage());
        }
    }

    public ScheduleEntry updateScheduleEntry(String id, DtoScheduleEntry dtoEntryUpdate) {
        try {
            validateInput(dtoEntryUpdate);
            checkIfEntryExists(id);
            ScheduleEntry updatedEntry = extractEntryFromDto(dtoEntryUpdate);
            updatedEntry.setId(id);
            return scheduleEntryRepository.save(updatedEntry);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException(e.getMessage());
        } catch (NoSuchElementException e) {
            throw new NoSuchElementException(e.getMessage());
        }
    }

    public void deleteEntryById(String id) {
        try {
            checkIfEntryExists(id);
            scheduleEntryRepository.deleteById(id);
        } catch (NoSuchElementException e) {
            throw new NoSuchElementException(e.getMessage());
        }
    }

    private void validateInput(DtoScheduleEntry dtoNewEntry) {
        if (dtoNewEntry.getTitle() == null) {
            throw new IllegalArgumentException("The title of the new entry was null");
        } else if (dtoNewEntry.getDescription() == null) {
            throw new IllegalArgumentException("The description of the new entry was null");
        } else if (dtoNewEntry.getEntryDate() == null) {
            throw new IllegalArgumentException("The date of the new entry was null");
        } else if (dtoNewEntry.getDurationInMinutes() == null) {
            throw new IllegalArgumentException("The duration of the new entry was null");
        }
    }

    private void checkIfEntryExists(String id) {
        if (!scheduleEntryRepository.existsById(id)) {
            throw new NoSuchElementException("There is no entry with id " + id);
        }
    }

    private ScheduleEntry extractEntryFromDto(DtoScheduleEntry dtoEntry) {

        ScheduleEntry extractedScheduleEntry = new ScheduleEntry();

        extractedScheduleEntry.setTitle(dtoEntry.getTitle());
        extractedScheduleEntry.setDescription(dtoEntry.getDescription());
        extractedScheduleEntry.setEntryDate(dtoEntry.getEntryDate());
        extractedScheduleEntry.setDurationInMinutes(dtoEntry.getDurationInMinutes());

        return extractedScheduleEntry;
    }
}

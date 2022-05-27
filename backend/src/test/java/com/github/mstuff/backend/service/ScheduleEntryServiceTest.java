package com.github.mstuff.backend.service;

import com.github.mstuff.backend.dto.DtoNewScheduleEntry;
import com.github.mstuff.backend.model.ScheduleEntry;
import com.github.mstuff.backend.repository.ScheduleEntryRepository;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


class ScheduleEntryServiceTest {

    private final ScheduleEntryRepository scheduleEntryRepository = mock(ScheduleEntryRepository.class);
    private final ScheduleEntryService scheduleEntryService = new ScheduleEntryService(scheduleEntryRepository);


    @Test
    void getAllAppointments_whenAtLeastOneAppointmentInDB_shouldReturnListWithAtLeastOneElement() {

        //GIVEN
        ScheduleEntry scheduleEntry1 = ScheduleEntry.builder()
                .id("123")
                .title("Appointment1")
                .description("description1")
                .entryDate("1")
                .entryTime("2")
                .build();

        when(scheduleEntryRepository.findAll())
                .thenReturn(List.of(scheduleEntry1));


        //WHEN

        List<ScheduleEntry> actual = scheduleEntryService.getAllScheduleEntries();


        //THEN
        List<ScheduleEntry> expected = List.of(ScheduleEntry.builder()
                .id("123")
                .title("Appointment1")
                .description("description1")
                .entryDate("1")
                .entryTime("2")
                .build());

        verify(scheduleEntryRepository).findAll();
        assertEquals(expected, actual);
    }

    @Test
    void addNewScheduleEntry_whenValidEntryAdded_shouldReturnNewEntry () {

        //GIVEN
        ScheduleEntry newEntry1 = ScheduleEntry.builder()
                .title("Appointment1")
                .description("description1")
                .entryDate("1")
                .entryTime("2")
                .build();
        when(scheduleEntryRepository.insert(newEntry1))
                .thenReturn(ScheduleEntry.builder()
                        .id("123-test")
                        .title("Appointment1")
                        .description("description1")
                        .entryDate("1")
                        .entryTime("2")
                        .build());

        //WHEN
        DtoNewScheduleEntry dtoNewEntry = DtoNewScheduleEntry.builder()
                .title("Appointment1")
                .description("description1")
                .entryDate("1")
                .entryTime("2")
                .build();

        ScheduleEntry actual = scheduleEntryService.addNewScheduleEntry(dtoNewEntry);

        //THEN
        ScheduleEntry expected = ScheduleEntry.builder()
                .id("123-test")
                .title("Appointment1")
                .description("description1")
                .entryDate("1")
                .entryTime("2")
                .build();

        verify(scheduleEntryRepository).insert(newEntry1);
        assertEquals(expected, actual);
    }

    @Test
    void addNewScheduleEntry_whenNewEntryTitleIsNull_shouldThrowException () {

        //GIVEN
        //WHEN
        DtoNewScheduleEntry dtoNewEntry = DtoNewScheduleEntry.builder()

                .description("description1")
                .entryDate("1")
                .entryTime("2")
                .build();

        //THEN
        assertThrows(IllegalArgumentException.class,
                () -> scheduleEntryService.addNewScheduleEntry(dtoNewEntry));
    }

    @Test
    void addNewScheduleEntry_whenNewEntryDescriptionIsNull_shouldThrowException () {

        //GIVEN
        //WHEN
        DtoNewScheduleEntry dtoNewEntry = DtoNewScheduleEntry.builder()
                .title("Appointment1")

                .entryDate("1")
                .entryTime("2")
                .build();

        //THEN
        assertThrows(IllegalArgumentException.class,
                () -> scheduleEntryService.addNewScheduleEntry(dtoNewEntry));
    }

    @Test
    void addNewScheduleEntry_whenNewEntryDateIsNull_shouldThrowException () {

        //GIVEN
        //WHEN
        DtoNewScheduleEntry dtoNewEntry = DtoNewScheduleEntry.builder()
                .title("Appointment1")
                .description("description1")

                .entryTime("2")
                .build();

        //THEN
        assertThrows(IllegalArgumentException.class,
                () -> scheduleEntryService.addNewScheduleEntry(dtoNewEntry));
    }

    @Test
    void addNewScheduleEntry_whenNewEntryTimeIsNull_shouldThrowException () {

        //GIVEN
        //WHEN
        DtoNewScheduleEntry dtoNewEntry = DtoNewScheduleEntry.builder()
                .title("Appointment1")
                .description("description1")
                .entryDate("1")

                .build();

        //THEN
        assertThrows(IllegalArgumentException.class,
                () -> scheduleEntryService.addNewScheduleEntry(dtoNewEntry));
    }
}

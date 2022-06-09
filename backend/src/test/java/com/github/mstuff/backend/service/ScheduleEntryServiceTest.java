package com.github.mstuff.backend.service;

import com.github.mstuff.backend.dto.DtoScheduleEntry;
import com.github.mstuff.backend.model.ScheduleEntry;
import com.github.mstuff.backend.repository.ScheduleEntryRepository;
import org.junit.jupiter.api.Test;

import java.time.Instant;
import java.util.List;
import java.util.NoSuchElementException;

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
                .entryDate(Instant.parse("2022-05-28T22:00:00.000Z"))
                .durationInMinutes(400)
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
                .entryDate(Instant.parse("2022-05-28T22:00:00.000Z"))
                .durationInMinutes(400)
                .build());

        verify(scheduleEntryRepository).findAll();
        assertEquals(expected, actual);
    }

    @Test
    void addNewScheduleEntry_whenValidEntryAdded_shouldReturnNewEntry() {

        //GIVEN
        ScheduleEntry newEntry1 = ScheduleEntry.builder()
                .title("Appointment1")
                .description("description1")
                .entryDate(Instant.parse("2022-05-28T22:00:00.000Z"))
                .durationInMinutes(400)
                .build();
        when(scheduleEntryRepository.insert(newEntry1))
                .thenReturn(ScheduleEntry.builder()
                        .id("123-test")
                        .title("Appointment1")
                        .description("description1")
                        .entryDate(Instant.parse("2022-05-28T22:00:00.000Z"))
                        .durationInMinutes(400)
                        .build());

        //WHEN
        DtoScheduleEntry dtoNewEntry = DtoScheduleEntry.builder()
                .title("Appointment1")
                .description("description1")
                .entryDate(Instant.parse("2022-05-28T22:00:00.000Z"))
                .durationInMinutes(400)
                .build();

        ScheduleEntry actual = scheduleEntryService.addNewScheduleEntry(dtoNewEntry);

        //THEN
        ScheduleEntry expected = ScheduleEntry.builder()
                .id("123-test")
                .title("Appointment1")
                .description("description1")
                .entryDate(Instant.parse("2022-05-28T22:00:00.000Z"))
                .durationInMinutes(400)
                .build();

        verify(scheduleEntryRepository).insert(newEntry1);
        assertEquals(expected, actual);
    }

    @Test
    void addNewScheduleEntry_whenNewEntryTitleIsNull_shouldThrowException() {

        //GIVEN
        //WHEN
        DtoScheduleEntry dtoNewEntry = DtoScheduleEntry.builder()

                .description("description1")
                .entryDate(Instant.parse("2022-05-28T22:00:00.000Z"))
                .durationInMinutes(400)
                .build();

        //THEN
        assertThrows(IllegalArgumentException.class,
                () -> scheduleEntryService.addNewScheduleEntry(dtoNewEntry));
    }

    @Test
    void addNewScheduleEntry_whenNewEntryDescriptionIsNull_shouldThrowException() {

        //GIVEN
        //WHEN
        DtoScheduleEntry dtoNewEntry = DtoScheduleEntry.builder()
                .title("Appointment1")

                .entryDate(Instant.parse("2022-05-28T22:00:00.000Z"))
                .durationInMinutes(400)
                .build();

        //THEN
        assertThrows(IllegalArgumentException.class,
                () -> scheduleEntryService.addNewScheduleEntry(dtoNewEntry));
    }

    @Test
    void addNewScheduleEntry_whenNewEntryDateIsNull_shouldThrowException() {

        //GIVEN
        //WHEN
        DtoScheduleEntry dtoNewEntry = DtoScheduleEntry.builder()
                .title("Appointment1")
                .description("description1")

                .durationInMinutes(400)
                .build();

        //THEN
        assertThrows(IllegalArgumentException.class,
                () -> scheduleEntryService.addNewScheduleEntry(dtoNewEntry));
    }

    @Test
    void addNewScheduleEntry_whenNewEntryTimeIsNull_shouldThrowException() {

        //GIVEN
        //WHEN
        DtoScheduleEntry dtoNewEntry = DtoScheduleEntry.builder()
                .title("Appointment1")
                .description("description1")
                .entryDate(Instant.parse("2022-05-28T22:00:00.000Z"))

                .build();

        //THEN
        assertThrows(IllegalArgumentException.class,
                () -> scheduleEntryService.addNewScheduleEntry(dtoNewEntry));
    }

    @Test
    void deleteEntryById_whenEntryExists_shouldDeleteEntry() {

        //GIVEN
        String id = "123";
        when(scheduleEntryRepository.existsById(id)).thenReturn(true);

        //WHEN
        scheduleEntryService.deleteEntryById(id);

        //THEN
        verify(scheduleEntryRepository).deleteById(id);
    }

    @Test
    void deleteEntryById_whenEntryDoesNotExist_shouldThrowException() {

        //GIVEN
        String wrongId = "123";
        when(scheduleEntryRepository.existsById(wrongId)).thenReturn(false);

        //WHEN
        //THEN
        assertThrows(NoSuchElementException.class,
                () -> scheduleEntryService.deleteEntryById(wrongId));
        verify(scheduleEntryRepository).existsById(wrongId);
    }
}

package com.github.mstuff.backend.service;

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
                .entryDummyDate("21.05.2022")
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
                .entryDummyDate("21.05.2022")
                .build());

        verify(scheduleEntryRepository).findAll();
        assertEquals(expected, actual);


    }


}
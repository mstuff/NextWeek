package com.github.mstuff.backend.controller;

import com.github.mstuff.backend.model.ScheduleEntry;
import com.github.mstuff.backend.repository.ScheduleEntryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.reactive.server.WebTestClient;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest(webEnvironment =
        SpringBootTest.WebEnvironment.RANDOM_PORT)
class ScheduleEntryControllerTest {

    @Autowired
    private WebTestClient webTestClient;

    @Autowired
    private ScheduleEntryRepository scheduleEntryRepository;

    @BeforeEach
    public void cleanUp(){
        scheduleEntryRepository.deleteAll();
    }

    @Test
    void getAllAppointments_shouldReturnAppointmentsFromDb() {

        //GIVEN
        ScheduleEntry scheduleEntry1 = ScheduleEntry.builder()
                .id("123")
                .title("Appointment1")
                .description("description1")
                .entryDummyDate("21.05.2022")
                .build();
        scheduleEntryRepository.insert(scheduleEntry1);

        //WHEN
        List<ScheduleEntry> actual = webTestClient.get()
                .uri("/api/appointments")
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBodyList(ScheduleEntry.class)
                .returnResult()
                .getResponseBody();

        //THEN
        List<ScheduleEntry> expected = List.of(ScheduleEntry.builder()
                .id("123")
                .title("Appointment1")
                .description("description1")
                .entryDummyDate("21.05.2022")
                .build());

        assertEquals(expected, actual);

    }
}
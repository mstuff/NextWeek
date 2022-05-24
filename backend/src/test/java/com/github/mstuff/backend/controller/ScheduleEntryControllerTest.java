package com.github.mstuff.backend.controller;

import com.github.mstuff.backend.dto.DtoNewScheduleEntry;
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
                .uri("/api/schedule")
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

    @Test
    void addNewScheduleEntry_shouldReturnTheNewScheduleEntry(){

        //GIVEN
        DtoNewScheduleEntry dtoNewEntry = DtoNewScheduleEntry.builder()
                .title("Appointment1")
                .description("description1")
                .entryDummyDate("21.05.2022")
                .build();

        //WHEN
        ScheduleEntry actual = webTestClient.post()
                .uri("/api/schedule")
                .bodyValue(dtoNewEntry)
                .exchange()
                .expectStatus().isOk()
                .expectBody(ScheduleEntry.class)
                .returnResult()
                .getResponseBody();

        //THEN
        assertNotNull(actual);
        assertNotNull(actual.getId());
        assertEquals("Appointment1", actual.getTitle());
        assertEquals("description1", actual.getDescription());
        assertEquals("21.05.2022", actual.getEntryDummyDate());
        assertEquals(24, actual.getId().length());

    }

    @Test
    void addNewScheduleEntry_whenMissingField_shouldThrowIllegalArgumentException(){

        //GIVEN
        DtoNewScheduleEntry dtoNewEntry = DtoNewScheduleEntry.builder()
                .description("description1")
                .entryDummyDate("21.05.2022")
                .build();

        //WHEN //THEN
        webTestClient.post()
                .uri("/api/schedule")
                .bodyValue(dtoNewEntry)
                .exchange()
                .expectStatus().is4xxClientError();

    }
}

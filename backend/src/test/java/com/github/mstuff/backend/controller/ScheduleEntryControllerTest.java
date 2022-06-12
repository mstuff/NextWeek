package com.github.mstuff.backend.controller;

import com.github.mstuff.backend.dto.DtoScheduleEntry;
import com.github.mstuff.backend.model.ScheduleEntry;
import com.github.mstuff.backend.repository.ScheduleEntryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.reactive.server.WebTestClient;

import java.time.Instant;
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
    public void cleanUp() {
        scheduleEntryRepository.deleteAll();
    }

    @Test
    void getAllAppointments_shouldReturnAppointmentsFromDb() {

        //GIVEN
        scheduleEntryRepository.insert(createTestEntry1());
        scheduleEntryRepository.insert(createTestEntry2());

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
                        .entryDate(Instant.parse("2022-05-28T22:00:00.000Z"))
                        .durationInMinutes(150)
                        .build(),
                ScheduleEntry.builder()
                        .id("456")
                        .title("Appointment2")
                        .description("description3")
                        .entryDate(Instant.parse("2022-06-28T22:00:00.000Z"))
                        .durationInMinutes(600)
                        .build());

        assertEquals(expected, actual);
    }

    @Test
    void addNewScheduleEntry_shouldReturnTheNewScheduleEntry() {

        //GIVEN
        DtoScheduleEntry dtoNewEntry = DtoScheduleEntry.builder()
                .title("Appointment1")
                .description("description1")
                .entryDate(Instant.parse("2022-05-28T22:00:00.000Z"))
                .durationInMinutes(150)
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
        assertEquals(Instant.parse("2022-05-28T22:00:00.000Z"), actual.getEntryDate());
        assertEquals(150, actual.getDurationInMinutes());
        assertEquals(24, actual.getId().length());
    }

    @Test
    void addNewScheduleEntry_whenMissingTitle_shouldExpectStatus400() {

        //GIVEN
        DtoScheduleEntry dtoNewEntry = DtoScheduleEntry.builder()
                .description("description1")
                .entryDate(Instant.parse("2022-05-28T22:00:00.000Z"))
                .durationInMinutes(150)
                .build();

        //WHEN //THEN
        webTestClient.post()

                .uri("/api/schedule")
                .bodyValue(dtoNewEntry)
                .exchange()
                .expectStatus().isEqualTo(400);
    }

    @Test
    void addNewScheduleEntry_whenMissingDescription_shouldExpectStatus400() {

        //GIVEN
        DtoScheduleEntry dtoNewEntry = DtoScheduleEntry.builder()
                .title("Title1")

                .entryDate(Instant.parse("2022-05-28T22:00:00.000Z"))
                .durationInMinutes(150)
                .build();

        //WHEN //THEN
        webTestClient.post()
                .uri("/api/schedule")
                .bodyValue(dtoNewEntry)
                .exchange()
                .expectStatus().isEqualTo(400);
    }

    @Test
    void addNewScheduleEntry_whenMissingEntryDate_shouldExpectStatus400() {

        //GIVEN
        DtoScheduleEntry dtoNewEntry = DtoScheduleEntry.builder()
                .title("Title1")
                .description("Description")

                .durationInMinutes(150)
                .build();

        //WHEN //THEN
        webTestClient.post()
                .uri("/api/schedule")
                .bodyValue(dtoNewEntry)
                .exchange()
                .expectStatus().isEqualTo(400);
    }

    @Test
    void updateScheduleEntry_whenIdExists_shouldReturnUpdatedEntry() {

        //GIVEN
        ScheduleEntry entry1ToBeUpdated = ScheduleEntry.builder()
                .id("123")
                .title("Appointment1")
                .description("description1")
                .entryDate(Instant.parse("2022-05-28T22:00:00.000Z"))
                .durationInMinutes(150)
                .build();

        scheduleEntryRepository.insert(entry1ToBeUpdated);
        scheduleEntryRepository.insert(createTestEntry2());

        DtoScheduleEntry dtoEntry1ToUpdate = DtoScheduleEntry.builder()
                .title("Updated Title")
                .description("description1")
                .entryDate(Instant.parse("2022-05-28T22:00:00.000Z"))
                .durationInMinutes(150)
                .build();

        //WHEN
        ScheduleEntry actual = webTestClient.put()
                .uri("/api/schedule/123")
                .bodyValue(dtoEntry1ToUpdate)
                .exchange()
                .expectStatus().isOk()
                .expectBody(ScheduleEntry.class)
                .returnResult()
                .getResponseBody();

        //THEN
        assertNotNull(actual);
        assertNotNull(actual.getId());
        assertEquals("Updated Title", actual.getTitle());
        assertEquals("description1", actual.getDescription());
        assertEquals(Instant.parse("2022-05-28T22:00:00.000Z"), actual.getEntryDate());
        assertEquals(150, actual.getDurationInMinutes());
    }

    @Test
    void updateScheduleEntry_whenTitleIsNull_shouldExpectStatus400() {

        //GIVEN
        DtoScheduleEntry dtoEntry1ToUpdate = DtoScheduleEntry.builder()
                .title(null)
                .description("description1")
                .entryDate(Instant.parse("2022-05-28T22:00:00.000Z"))
                .durationInMinutes(150)
                .build();

        //WHEN //THEN
        webTestClient.put()
                .uri("/api/schedule/123")
                .bodyValue(dtoEntry1ToUpdate)
                .exchange()
                .expectStatus().isEqualTo(400);
    }

    @Test
    void updateScheduleEntry_whenDescriptionIsNull_shouldExpectStatus400() {

        //GIVEN
        DtoScheduleEntry dtoEntry1ToUpdate = DtoScheduleEntry.builder()
                .title("Updated Title")
                .description(null)
                .entryDate(Instant.parse("2022-05-28T22:00:00.000Z"))
                .durationInMinutes(150)
                .build();

        //WHEN //THEN
        webTestClient.put()
                .uri("/api/schedule/123")
                .bodyValue(dtoEntry1ToUpdate)
                .exchange()
                .expectStatus().isEqualTo(400);
    }

    @Test
    void updateScheduleEntry_whenDateIsNull_shouldExpectStatus400() {

        //GIVEN
        DtoScheduleEntry dtoEntry1ToUpdate = DtoScheduleEntry.builder()
                .title("Updated Title")
                .description("description1")
                .entryDate(null)
                .durationInMinutes(150)
                .build();

        //WHEN //THEN
        webTestClient.put()
                .uri("/api/schedule/123")
                .bodyValue(dtoEntry1ToUpdate)
                .exchange()
                .expectStatus().isEqualTo(400);
    }

    @Test
    void updateScheduleEntry_whenDurationIsNull_shouldExpectStatus400() {

        //GIVEN
        DtoScheduleEntry dtoEntry1ToUpdate = DtoScheduleEntry.builder()
                .title("Updated Title")
                .description("description1")
                .entryDate(Instant.parse("2022-05-28T22:00:00.000Z"))
                .durationInMinutes(null)
                .build();

        //WHEN //THEN
        webTestClient.put()
                .uri("/api/schedule/123")
                .bodyValue(dtoEntry1ToUpdate)
                .exchange()
                .expectStatus().isEqualTo(400);
    }

    @Test
    void updateScheduleEntry_whenIdNotValid_shouldExpectStatus400() {
        //GIVEN
        scheduleEntryRepository.insert(createTestEntry1());
        scheduleEntryRepository.insert(createTestEntry2());

        DtoScheduleEntry dtoEntry1ToUpdate = DtoScheduleEntry.builder()
                .title("Updated Title")
                .description("description1")
                .entryDate(Instant.parse("2022-05-28T22:00:00.000Z"))
                .durationInMinutes(150)
                .build();

        //WHEN //THEN
        webTestClient.put()
                .uri("/api/schedule/wrongId")
                .bodyValue(dtoEntry1ToUpdate)
                .exchange()
                .expectStatus().isEqualTo(400);
    }

    @Test
    void deleteScheduleEntryById_whenIdExists_shouldDeleteEntry() {

        //GIVEN
        scheduleEntryRepository.insert(createTestEntry1());
        scheduleEntryRepository.insert(createTestEntry2());

        //WHEN
        webTestClient.delete()
                .uri("/api/schedule/123")
                .exchange()
                .expectStatus().is2xxSuccessful();

        //THEN
        List<ScheduleEntry> actual = scheduleEntryRepository.findAll();
        List<ScheduleEntry> expected = List.of(createTestEntry2());
        assertEquals(expected, actual);
    }

    @Test
    void deleteScheduleEntryById_whenIdNotValid_shouldExpectStatus400() {

        //GIVEN
        scheduleEntryRepository.insert(createTestEntry1());
        scheduleEntryRepository.insert(createTestEntry2());

        //WHEN //THEN
        webTestClient.delete()
                .uri("/api/schedule/9")
                .exchange()
                .expectStatus().isEqualTo(400);
    }

     private ScheduleEntry createTestEntry1() {
       return   ScheduleEntry.builder()
                 .id("123")
                 .title("Appointment1")
                 .description("description1")
                 .entryDate(Instant.parse("2022-05-28T22:00:00.000Z"))
                 .durationInMinutes(150)
                 .build();
     }


     private ScheduleEntry createTestEntry2() {
      return ScheduleEntry.builder()
              .id("456")
              .title("Appointment2")
              .description("description3")
              .entryDate(Instant.parse("2022-06-28T22:00:00.000Z"))
              .durationInMinutes(600)
              .build();
     }
}

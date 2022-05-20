package com.github.mstuff.backend.controller;

import com.github.mstuff.backend.model.Appointment;
import com.github.mstuff.backend.repository.AppointmentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.reactive.server.WebTestClient;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest(webEnvironment =
        SpringBootTest.WebEnvironment.RANDOM_PORT)
class AppointmentControllerTest {

    @Autowired
    private WebTestClient webTestClient;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @BeforeEach
    public void cleanUp(){
        appointmentRepository.deleteAll();
    }

    @Test
    void getAllAppointments_shouldReturnAppointmentsFromDb() {

        //GIVEN
        Appointment appointment1 = Appointment.builder()
                .id("123")
                .title("Appointment1")
                .description("description1")
                .appointmentDummyDate("21.05.2022")
                .build();
        appointmentRepository.insert(appointment1);

        //WHEN
        List<Appointment> actual = webTestClient.get()
                .uri("/api/appointments")
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBodyList(Appointment.class)
                .returnResult()
                .getResponseBody();

        //THEN
        List<Appointment> expected = List.of(Appointment.builder()
                .id("123")
                .title("Appointment1")
                .description("description1")
                .appointmentDummyDate("21.05.2022")
                .build());

        assertEquals(expected, actual);

    }
}
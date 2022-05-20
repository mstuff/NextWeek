package com.github.mstuff.backend.service;

import com.github.mstuff.backend.model.Appointment;
import com.github.mstuff.backend.repository.AppointmentRepository;
import org.junit.jupiter.api.Test;


import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


class AppointmentServiceTest {


    private final AppointmentRepository appointmentRepository = mock(AppointmentRepository.class);
    private final AppointmentService appointmentService = new AppointmentService(appointmentRepository);

    @Test
    void getAllAppointments_whenAtLeastOneAppointmentInDB_shouldReturnListWithAtLeastOneElement() {

        //GIVEN
        Appointment appointment1 = Appointment.builder()
                .id("123")
                .title("Appointment1")
                .description("description1")
                .appointmentDummyDate("21.05.2022")
                .build();

        when(appointmentRepository.findAll())
                .thenReturn(List.of(appointment1));


        //WHEN

        List<Appointment> actual = appointmentService.getAllAppointments();


        //THEN
        List<Appointment> expected = List.of(Appointment.builder()
                .id("123")
                .title("Appointment1")
                .description("description1")
                .appointmentDummyDate("21.05.2022")
                .build());

        verify(appointmentRepository).findAll();
        assertEquals(expected, actual);


    }


}
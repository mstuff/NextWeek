package com.github.mstuff.backend.repository;

import com.github.mstuff.backend.model.ScheduleEntry;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScheduleEntryRepository extends MongoRepository<ScheduleEntry, String> {

}

package kr.dgucaps.capsv4.domain.event.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@Table(name = "event_quiz_apply_tb")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DiscriminatorValue("Quiz")
@SuperBuilder
public class EventQuizApply extends EventApply {

    private String answer;
}

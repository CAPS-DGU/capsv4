package kr.dgucaps.capsv4.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "event_quiz_apply_tb")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DiscriminatorValue("Quiz")
public class EventQuizApply extends EventApply {

    private String answer;
}

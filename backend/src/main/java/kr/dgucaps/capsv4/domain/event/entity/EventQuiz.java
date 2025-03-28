package kr.dgucaps.capsv4.domain.event.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@Table(name = "event_quiz_tb")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DiscriminatorValue("Quiz")
@SuperBuilder
public class EventQuiz extends Event {

    private String question;

    private String correctAnswer;

    public void updateQuestion(String question) {
        this.question = question;
    }

    public void updateCorrectAnswer(String correctAnswer) {
        this.correctAnswer = correctAnswer;
    }
}

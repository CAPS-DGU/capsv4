package kr.dgucaps.capsv4.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;

@Entity
@Getter
@Table(name = "event_snack_tb")
@DiscriminatorValue("Snack")
public class EventSnack extends Event {
}

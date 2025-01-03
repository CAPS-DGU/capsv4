package kr.dgucaps.capsv4.domain.event.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@Table(name = "event_snack_apply_tb")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DiscriminatorValue("Snack")
@SuperBuilder
public class EventSnackApply extends EventApply {

    private String phone;
}

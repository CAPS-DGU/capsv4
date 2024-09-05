package kr.dgucaps.capsv4.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "event_snack_apply_tb")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DiscriminatorValue("Snack")
public class EventSnackApply extends EventApply {

    private String phone;
}
